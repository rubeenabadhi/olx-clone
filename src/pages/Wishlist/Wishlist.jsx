import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { getWishlist, removeFromWishlist } from "../../services/wishlist";
import placeholderImg from "../../assets/images/cars.png";
import "./Wishlist.css";

function Wishlist() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const data = await getWishlist(currentUser.uid);
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [currentUser]);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(currentUser.uid, productId);
      setItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="wishlist-page">
        <h1 className="wishlist-title">Wishlist</h1>

        {loading && <p className="wishlist-status">Loading...</p>}

        {!loading && !currentUser && (
          <p className="wishlist-status">Please log in to view your wishlist.</p>
        )}

        {!loading && currentUser && items.length === 0 && (
          <p className="wishlist-status">
            You haven't saved anything yet. Tap the heart icon on any ad to save it here.
          </p>
        )}

        <div className="wishlist-grid">
          {items.map((item) => (
            <div key={item.id} className="wishlist-card">
              <div
                className="wishlist-image-wrapper"
                onClick={() => navigate(`/item/${item.productId}`)}
              >
                <img
                  src={item.photo || placeholderImg}
                  alt={item.title}
                  className="wishlist-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                  }}
                />
              </div>

              <div className="wishlist-info">
                <p className="wishlist-price">
                  ₹ {item.price?.toLocaleString("en-IN")}
                </p>
                <p
                  className="wishlist-item-title"
                  onClick={() => navigate(`/item/${item.productId}`)}
                >
                  {item.title}
                </p>
              </div>

              <button
                className="wishlist-remove-btn"
                onClick={() => handleRemove(item.productId)}
                title="Remove from wishlist"
              >
                ❤️
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Wishlist;