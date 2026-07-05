import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import categoryFieldsConfig from "../../assets/data/categoryFieldsConfig";
import postAdCategories from "../../assets/data/postAdCategories";
import { addProduct, updateProduct, getProductById } from "../../services/product";
import profile_icon from '../../assets/icons/profile-icon.png'
import { uploadProductImages } from "../../services/storage";

import "./PostAd.css";

const indianStates = [
  "Andaman & Nicobar",
  "Andhra Pradesh",
  "Delhi",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Tamil Nadu",
  "West Bengal",
];

function PostAdAttributes() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category") || "default";
  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);

  const category = postAdCategories.find((c) => c.id === categoryId);
  const config = categoryFieldsConfig[categoryId] || categoryFieldsConfig.default;

  const [formValues, setFormValues] = useState({});
  const [adTitle, setAdTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState(Array(12).fill(null)); // preview URLs for display
  const [photoFiles, setPhotoFiles] = useState(Array(12).fill(null)); // actual File objects
  const [locationTab, setLocationTab] = useState("list");
  const [state, setState] = useState("");
  const [name, setName] = useState(currentUser?.displayName || "");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(isEditMode);

  // Load existing ad data when editing
  useEffect(() => {
    if (!isEditMode) return;

    const loadExistingAd = async () => {
      try {
        const existing = await getProductById(editId);
        if (!existing) {
          console.error("EDIT LOAD FAILED: ad not found for id", editId);
          return;
        }

        console.log("EDIT MODE: loaded existing ad:", existing); // TEMP DEBUG

        setFormValues(
          Object.fromEntries(
            config.fields.map((f) => [f.id, existing[f.id] || ""])
          )
        );
        setAdTitle(existing.title || "");
        setDescription(existing.description || "");
        setPrice(String(existing.price || ""));
        setPhotos((prev) => {
          const next = [...prev];
          (existing.photos || []).forEach((url, i) => (next[i] = url));
          return next;
        });
        setState(existing.state || "");
        setName(existing.sellerName || "");
        setPhone(existing.phone || "");
      } catch (err) {
        console.error("Failed to load ad for editing:", err);
      } finally {
        setLoadingExisting(false);
      }
    };

    loadExistingAd();
  }, [isEditMode, editId]);

  const handleFieldChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhotoUpload = (index, file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);

    setPhotos((prev) => {
      const next = [...prev];
      next[index] = previewUrl;
      return next;
    });

    setPhotoFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const validate = () => {
    const newErrors = {};
    config.fields.forEach((f) => {
      if (f.required && !formValues[f.id]) newErrors[f.id] = true;
    });
    if (!adTitle) newErrors.adTitle = true;
    if (!description) newErrors.description = true;
    if (!price) newErrors.price = true;
    if (!photos.some((p) => p)) newErrors.photos = true;
    if (!state) newErrors.state = true;
    if (!name) newErrors.name = true;
    if (!phone || phone.length !== 10) newErrors.phone = true;

    console.log("VALIDATION ERRORS:", newErrors); // TEMP DEBUG

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostNow = async () => {
    console.log("STEP 1: Post now clicked"); // TEMP DEBUG

    if (!validate()) {
      console.log("STEP 1 FAILED: validation failed, see VALIDATION ERRORS above"); // TEMP DEBUG
      return;
    }
    console.log("STEP 1 OK: validation passed"); // TEMP DEBUG

    setUploading(true);
    try {
      // Only upload NEW files (existing photos are already URLs, not File objects)
      const filesToUpload = photoFiles.filter(Boolean);
      console.log("STEP 2: files to upload:", filesToUpload); // TEMP DEBUG

      const newUploadedUrls = filesToUpload.length
        ? await uploadProductImages(filesToUpload)
        : [];
      console.log("STEP 2 OK: uploaded URLs:", newUploadedUrls); // TEMP DEBUG

      // Keep existing photo URLs that weren't replaced (skip old blob: URLs, they're dead)
      const existingPhotoUrls = photos.filter(
        (p) => p && !p.startsWith("blob:")
      );
      const finalPhotos = [...existingPhotoUrls, ...newUploadedUrls];

      const adData = {
        category: category?.name || "General",
        categoryId: categoryId,
        ...formValues,
        title: adTitle,
        description,
        price: Number(price),
        photos: finalPhotos,
        state,
        sellerName: name,
        phone,
        sellerId: currentUser?.uid || null,
        sellerPhoto: currentUser?.photoURL || null,
        memberSince: currentUser?.metadata?.creationTime || null,
      };

      console.log("STEP 3: saving ad to Firestore:", adData); // TEMP DEBUG

      if (isEditMode) {
        await updateProduct(editId, adData);
        console.log("STEP 3 OK: updated ad", editId); // TEMP DEBUG
        navigate(`/item/${editId}`);
      } else {
        const newId = await addProduct(adData);
        console.log("STEP 3 OK: saved with id", newId); // TEMP DEBUG
        navigate(`/item/${newId}`);
      }
    } catch (err) {
      console.error("FAILED AT SOME STEP:", err); // TEMP DEBUG
      console.error("Error code:", err.code); // TEMP DEBUG
      console.error("Error message:", err.message); // TEMP DEBUG
    } finally {
      setUploading(false);
    }
  };

  const isFormReady =
    adTitle && description && price && photos.some(Boolean) && state && name && phone.length === 10;

  if (loadingExisting) {
    return (
      <div className="postad-page">
        <p style={{ textAlign: "center", padding: "60px" }}>Loading ad details...</p>
      </div>
    );
  }

  return (
    <div className="postad-page">
      <div className="postad-topbar">
        <button className="back-btn-icon" onClick={() => navigate(-1)}>
          ←
        </button>
      </div>

      <h1 className="postad-title">{isEditMode ? "EDIT YOUR AD" : "POST YOUR AD"}</h1>

      <div className="attributes-card">
        {/* Selected category */}
        <div className="section">
          <h4 className="section-heading">SELECTED CATEGORY</h4>
          <p className="selected-category-text">
            {config.subcategory} / {config.subcategory}{" "}
            <span className="change-link" onClick={() => navigate("/post")}>
              Change
            </span>
          </p>
        </div>

        {/* Dynamic fields */}
        <div className="section">
          <h4 className="section-heading">INCLUDE SOME DETAILS</h4>

          {config.fields.map((field) => (
            <div className="form-group" key={field.id}>
              <label>
                {field.label} {field.required && <span className="required">*</span>}
              </label>

              {field.type === "select" && (
                <select
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className={errors[field.id] ? "input-error" : ""}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "text" && (
                <input
                  type="text"
                  maxLength={field.maxLength}
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className={errors[field.id] ? "input-error" : ""}
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className={errors[field.id] ? "input-error" : ""}
                />
              )}

              {field.type === "chips" && (
                <div className="chip-group">
                  {field.options.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className={`chip ${
                        formValues[field.id] === opt ? "chip-active" : ""
                      }`}
                      onClick={() => handleFieldChange(field.id, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {field.maxLength && (
                <p className="char-count">
                  {(formValues[field.id] || "").length} / {field.maxLength}
                </p>
              )}
            </div>
          ))}

          {/* Ad title */}
          <div className="form-group">
            <label>
              Ad title <span className="required">*</span>
            </label>
            <input
              type="text"
              maxLength={70}
              value={adTitle}
              onChange={(e) => setAdTitle(e.target.value)}
              className={errors.adTitle ? "input-error" : ""}
            />
            <p className="field-hint">
              Mention the key features of your item (e.g. brand, model, age, type)
              <span className="char-count-inline">{adTitle.length} / 70</span>
            </p>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>
              Description <span className="required">*</span>
            </label>
            <textarea
              maxLength={4096}
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "input-error" : ""}
            />
            <p className="char-count">{description.length} / 4096</p>
          </div>
        </div>

        {/* Price */}
        <div className="section">
          <h4 className="section-heading">SET A PRICE</h4>
          <div className="form-group">
            <label>Price*</label>
            <div className="price-input-row">
              <span className="rupee">₹</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={errors.price ? "input-error" : ""}
              />
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="section">
          <h4 className="section-heading">UPLOAD PHOTOS</h4>
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <label key={index} className="photo-slot">
                {photo ? (
                  <img src={photo} alt={`upload-${index}`} className="photo-preview" />
                ) : (
                  <span className="photo-icon">📷</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handlePhotoUpload(index, e.target.files[0])}
                />
              </label>
            ))}
          </div>
          {errors.photos && <p className="field-error">This field is mandatory</p>}
        </div>

        {/* Location */}
        <div className="section">
          <h4 className="section-heading">CONFIRM YOUR LOCATION</h4>

          <div className="location-tabs">
            <button
              className={`location-tab ${locationTab === "list" ? "active" : ""}`}
              onClick={() => setLocationTab("list")}
            >
              LIST
            </button>
            <button
              className={`location-tab ${locationTab === "current" ? "active" : ""}`}
              onClick={() => setLocationTab("current")}
            >
              CURRENT LOCATION
            </button>
          </div>

          {locationTab === "list" && (
            <div className="form-group">
              <label>
                State <span className="required">*</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={errors.state ? "input-error" : ""}
              >
                <option value="" disabled>
                  Select
                </option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && <p className="field-error">This field is mandatory</p>}
            </div>
          )}

          {locationTab === "current" && (
            <p className="field-hint">
              We'll use your device location to detect your area automatically.
            </p>
          )}
        </div>

        {/* Review */}
        <div className="section">
          <h4 className="section-heading">REVIEW YOUR DETAILS</h4>

          <div className="review-name-row">
            <div className="review-avatar-wrapper">
              <img
                src={currentUser?.photoURL || profile_icon}
                alt="avatar"
                className="review-avatar"
              />
            </div>
            <div className="form-group name-input-wrapper">
              <label>Name</label>
              <input
                type="text"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "input-error" : ""}
              />
              <p className="char-count">{name.length} / 30</p>
            </div>
          </div>

          <p className="verify-heading">Let's verify your account</p>
          <p className="field-hint">
            We will send you a confirmation code by SMS on the next step.
          </p>

          <div className="form-group">
            <label>
              Mobile Phone Number <span className="required">*</span>
            </label>
            <div className="phone-input-row">
              <span className="country-code">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className={errors.phone ? "input-error" : ""}
              />
            </div>
          </div>
        </div>

        <button
          className={`post-now-btn ${isFormReady ? "active" : ""}`}
          onClick={handlePostNow}
          disabled={uploading}
        >
          {uploading ? "Saving..." : isEditMode ? "Update Ad" : "Post now"}
        </button>
      </div>
    </div>
  );
}

export default PostAdAttributes;