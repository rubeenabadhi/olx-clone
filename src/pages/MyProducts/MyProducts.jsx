import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { getProductsBySeller, deleteProduct } from "../../services/product";
import "./MyProducts.css";

function MyProducts() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const fetchAds = async () => {
      try {
        const data = await getProductsBySeller(currentUser.uid);
        setAds(data);
      } catch (err) {
        console.error("Failed to fetch your ads:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [currentUser]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this ad permanently?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    } catch (err) {
      console.error("Failed to delete ad:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="myads-page">
        <h1 className="myads-title">My Ads</h1>

        {loading && <p>Loading your ads...</p>}

        {!loading && !currentUser && <p>Please log in to view your ads.</p>}

        {!loading && currentUser && ads.length === 0 && (
          <p>You haven't posted any ads yet.</p>
        )}

        <div className="myads-list">
          {ads.map((ad) => (
            <div key={ad.id} className="myads-card">
              <img
                src={ad.photos?.[0] || "/assets/images/placeholder.png"}
                alt={ad.title}
                className="myads-image"
                onClick={() => navigate(`/item/${ad.id}`)}
              />

              <div className="myads-info">
                <p className="myads-price">
                  ₹ {ad.price?.toLocaleString("en-IN")}
                </p>
                <p className="myads-ad-title">{ad.title}</p>
                <p className="myads-location">{ad.state}</p>
              </div>

              <div className="myads-actions">
                <button
                  className="myads-edit-btn"
                  onClick={() =>
                    navigate(`/post/attributes?category=${ad.categoryId || "default"}&edit=${ad.id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="myads-delete-btn"
                  onClick={() => handleDelete(ad.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyProducts;