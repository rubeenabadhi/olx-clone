import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import placeholderImg from "../../assets/images/cars.png";

function ProductCard({ product, isWishlisted, onToggleWishlist }) {
  const navigate = useNavigate();

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist?.(product);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/item/${product.id}`)}>
      <div className="product-image-wrapper">
        <img
          src={product.photos?.[0] || placeholderImg}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImg;
          }}
        />

        {product.featured && <span className="badge-featured">FEATURED</span>}

        <button
          className={`wishlist-icon-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlistClick}
          title="wishlist"
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="product-info">
        <div className="price-row">
          <span className="price">₹ {product.price.toLocaleString("en-IN")}</span>
          <span className="date">{product.date}</span>
        </div>
        <p className="title">{product.title}</p>
        <p className="location">{product.location}</p>
      </div>
    </div>
  );
}

export default ProductCard;