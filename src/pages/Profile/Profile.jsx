import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/auth";
import Navbar from "../../components/Navbar/Navbar";
import profile_icon from "../../assets/icons/profile-icon.png";
import "./Profile.css";

function Profile() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="profile-loading">Loading...</p>;

  if (!currentUser) {
    return (
      <div>
        <Navbar />
        <div className="profile-empty">
          <p>You need to log in to view your profile.</p>
          <button className="auth-primary-btn" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <div className="profile-card">
          <img
            src={currentUser.photoURL || profile_icon}
            alt="profile"
            className="profile-avatar"
          />
          <h2>{currentUser.displayName || "OLX User"}</h2>
          <p className="profile-detail">
            {currentUser.email || currentUser.phoneNumber || "No contact info"}
          </p>

          <div className="profile-menu">
            <button className="profile-menu-item" onClick={() => navigate("/my-products")}>
              My Ads
            </button>
            <button className="profile-menu-item" onClick={() => navigate("/wishlist")}>
              Wishlist
            </button>
            <button className="profile-menu-item logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;