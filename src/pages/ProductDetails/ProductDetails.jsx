import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import {
  getProductById,
  getProductsBySeller,
  deleteProduct,
} from "../../services/product";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "../../services/wishlist";
import placeholderImg from "../../assets/images/cars.png";
import profileIcon from "../../assets/icons/profile-icon.svg";
import "./ProductDetails.css";

function formatDate(dateInput) {
  if (!dateInput) return "—";
  const date = dateInput.toDate ? dateInput.toDate() : new Date(dateInput);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatMemberSince(dateInput) {
  if (!dateInput) return "—";
  const date = new Date(dateInput);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getHeadline(product) {
  if (product.categoryId === "properties") {
    return `${product.bedrooms || "-"} BHK - ${product.bathrooms || "-"} Bathroom - ${
      product.area || "-"
    } sqft`;
  }
  return `${product.title}${product.year ? ` (${product.year})` : ""}`;
}

function getSecondaryLine(product) {
  if (product.categoryId === "properties") return product.title;
  if (product.fuel) return product.fuel.toUpperCase();
  return null;
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [itemsListedCount, setItemsListedCount] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        if (data?.sellerId) {
          const sellerAds = await getProductsBySeller(data.sellerId);
          setItemsListedCount(sellerAds.length);
        }

        if (currentUser) {
          const inWishlist = await isInWishlist(currentUser.uid, id);
          setWishlisted(inWishlist);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, currentUser]);

  const isOwner = currentUser?.uid === product?.sellerId;

  const handleWishlistToggle = async () => {
    if (!currentUser) {
      alert("Please log in to save to wishlist.");
      return;
    }
    try {
      if (wishlisted) {
        await removeFromWishlist(currentUser.uid, product.id);
        setWishlisted(false);
      } else {
        await addToWishlist(currentUser.uid, product);
        setWishlisted(true);
      }
    } catch (err) {
      console.error("Failed to update wishlist:", err);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: product.title,
      text: `Check out this listing: ${product.title}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled share sheet, ignore
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this ad permanently?");
    if (!confirmed) return;
    try {
      await deleteProduct(product.id);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete ad:", err);
    }
  };

  const handleEdit = () => {
    navigate(`/post/attributes?category=${product.categoryId || "default"}&edit=${product.id}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="pd-loading">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <p className="pd-loading">Ad not found.</p>
      </div>
    );
  }

  const photos = product.photos?.length ? product.photos : [placeholderImg];

  const prevImage = () =>
    setImageIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  const nextImage = () =>
    setImageIndex((i) => (i === photos.length - 1 ? 0 : i + 1));

  return (
    <div className="pd-page">
      <Navbar />

      <div className="pd-content">
        {/* Left column */}
        <div className="pd-left">
          <div className="pd-carousel">
            <button className="pd-arrow" onClick={prevImage}>
              ‹
            </button>

            <div className="pd-image-wrapper">
              <img
                src={photos[imageIndex]}
                alt={product.title}
                className="pd-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImg;
                }}
              />
              <span className="pd-watermark">olx</span>
            </div>

            <button className="pd-arrow" onClick={nextImage}>
              ›
            </button>
          </div>

          {photos.length > 1 && (
            <div className="pd-thumbnails">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`thumb-${index}`}
                  className={`pd-thumbnail ${index === imageIndex ? "active" : ""}`}
                  onClick={() => setImageIndex(index)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="pd-right">
          <div className="pd-card">
            <div className="pd-price-row">
              <p className="pd-price">₹ {product.price?.toLocaleString("en-IN")}</p>
              <div className="pd-icon-actions">
                <button className="pd-icon-btn" onClick={handleShare} title="Share">
                  🔗
                </button>
                <button
                  className={`pd-icon-btn ${wishlisted ? "wishlisted" : ""}`}
                  onClick={handleWishlistToggle}
                  title="Wishlist"
                >
                  {wishlisted ? "❤️" : "🤍"}
                </button>
              </div>
            </div>

            {shareCopied && <p className="pd-share-toast">Link copied!</p>}

            <h1 className="pd-headline">{getHeadline(product)}</h1>

            {getSecondaryLine(product) && (
              <p className="pd-secondary-line">{getSecondaryLine(product)}</p>
            )}

            <div className="pd-meta-row">
              <span>{product.state}</span>
              <span className="pd-meta-dot">•</span>
              <span>{formatDate(product.createdAt)}</span>
            </div>
          </div>

          <div className="pd-card pd-seller-card">
            <div className="pd-seller-top" onClick={() => navigate(`/profile/${product.sellerId}`)}>
              <img
                src={product.sellerPhoto || profileIcon}
                alt={product.sellerName}
                className="pd-seller-avatar"
              />
              <div>
                <p className="pd-posted-by">
                  Posted By{" "}
                  <span className="pd-seller-name">{product.sellerName}</span>
                </p>
                <p className="pd-member-since">
                  Member since {formatMemberSince(product.memberSince)}
                </p>
              </div>
              <span className="pd-chevron">›</span>
            </div>

            <div className="pd-items-listed">
              <p className="pd-items-count">{itemsListedCount}</p>
              <p className="pd-items-label">Items listed</p>
            </div>

            <button className="pd-chat-btn">Chat with seller</button>
          </div>

          {isOwner && (
            <div className="pd-card pd-owner-actions">
              <button className="pd-edit-btn" onClick={handleEdit}>
                ✏️ Edit Ad
              </button>
              <button className="pd-delete-btn" onClick={handleDelete}>
                🗑️ Delete Ad
              </button>
            </div>
          )}

          {product.description && (
            <div className="pd-card">
              <h3 className="pd-section-title">Description</h3>
              <p className="pd-description">{product.description}</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;