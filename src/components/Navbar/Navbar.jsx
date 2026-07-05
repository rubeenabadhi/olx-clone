import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from '../../assets/icons/olx_logo_2025.svg'
import location_icon from '../../assets/icons/location-icon.svg'
import search_icon from '../../assets/icons/search-icon.svg'
import wishlist_icon from '../../assets/icons/wishlist-icon.svg'
import chat_icon from '../../assets/icons/chat-icon.svg'
import profile_icon from '../../assets/icons/profile-icon.png'
import notification_icon from '../../assets/icons/notification-icon.svg'
import login_icon from '../../assets/icons/profile-icon.svg'
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/auth";


function Navbar() {
  const [location, setLocation] = useState("Andaman & Nicobar...");
  const [search, setSearch] = useState("");
  const { currentUser, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo-icon" onClick={() => navigate("/")}>
          <img src={logo} className='logo-olx' alt="OLX logo" />
        </span>

        <button className="location-btn">
          <img
            src={location_icon}
            className="icon-sm"
            alt="location"
          />
          <span className="location-text">{location}</span>
          <span className="chevron">›</span>
        </button>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder='Search "Mobiles"'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn">
          <img
            src={search_icon}
            alt="search"
            className="icon-sm"
          />
        </button>
      </div>

      <div className="navbar-right">
        <button className="nav-action" onClick={() => navigate("/wishlist")}>
          <img
            src={wishlist_icon}
            alt="wishlist"
            className="icon-md"
          />
          <span>Wishlist</span>
        </button>

        <button className="nav-action">
          <img
            src={chat_icon}
            alt="chat"
            className="icon-md"
          />
          <span>Chat</span>
        </button>

        {currentUser ? (
          <>
            <img
              src={currentUser.photoURL || profile_icon}
              alt="profile"
              className="avatar"
              onClick={() => navigate("/profile")}
            />
            <button className="nav-action" onClick={handleLogout}>
              <span>Logout</span>
            </button>
          </>
        ) : (
          <button className="nav-action" onClick={openAuthModal}>
            <img
              src={login_icon}
              alt="login"
              className="icon-md"
            />
            <span>Login</span>
          </button>
        )}

       <button className="sell-btn" onClick={() => currentUser ? navigate("/post") : openAuthModal()}>
       + SELL
        </button>

        <button className="bell-btn">
          <img
            src={notification_icon}
            alt="notifications"
            className="icon-md"
          />
        </button>
      </div>
    </header>
  );
}

export default Navbar;