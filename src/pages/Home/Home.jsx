import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CategoryTabs from "../../components/Navbar/CategoryTabs";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import categories from "../../assets/data/categories.js";
import { getProductsPage } from "../../services/product";
import { getWishlist, addToWishlist, removeFromWishlist } from "../../services/wishlist";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";

function Home() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [wishlistedIds, setWishlistedIds] = useState(new Set());

  // Initial load
  useEffect(() => {
    const fetchFirstPage = async () => {
      try {
        const { products: firstBatch, lastVisible, hasMore: more } = await getProductsPage();
        setProducts(firstBatch);
        setLastDoc(lastVisible);
        setHasMore(more);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFirstPage();
  }, []);

  // Wishlist sync
  useEffect(() => {
    if (!currentUser) {
      setWishlistedIds(new Set());
      return;
    }
    const fetchWishlist = async () => {
      try {
        const items = await getWishlist(currentUser.uid);
        setWishlistedIds(new Set(items.map((item) => item.productId)));
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      }
    };
    fetchWishlist();
  }, [currentUser]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const { products: nextBatch, lastVisible, hasMore: more } = await getProductsPage(lastDoc);
      setProducts((prev) => [...prev, ...nextBatch]);
      setLastDoc(lastVisible);
      setHasMore(more);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleToggleWishlist = async (product) => {
    if (!currentUser) {
      alert("Please log in to save to wishlist.");
      return;
    }

    const isSaved = wishlistedIds.has(product.id);

    try {
      if (isSaved) {
        await removeFromWishlist(currentUser.uid, product.id);
        setWishlistedIds((prev) => {
          const next = new Set(prev);
          next.delete(product.id);
          return next;
        });
      } else {
        await addToWishlist(currentUser.uid, product);
        setWishlistedIds((prev) => new Set(prev).add(product.id));
      }
    } catch (err) {
      console.error("Failed to update wishlist:", err);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <CategoryTabs />

      <main className="home-content">
        <section className="category-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-item">
              <div className="category-icon-wrapper">
                <img src={cat.icon} alt={cat.name} className="category-icon" />
              </div>
              <p className="category-name">{cat.name}</p>
            </div>
          ))}
        </section>

        <section className="recommendations">
          <h2>Fresh recommendations</h2>

          {loading && <p>Loading ads...</p>}

          {!loading && products.length === 0 && (
            <p>No ads posted yet. Be the first to sell something!</p>
          )}

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistedIds.has(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>

          {!loading && hasMore && (
            <div className="load-more-wrapper">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {!loading && !hasMore && products.length > 0 && (
            <p className="no-more-text">You've reached the end.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;