import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginWithGoogle } from "../../services/auth";
import PhoneAuth from "./PhoneAuth";
import EmailAuth from "./EmailAuth";
import love from '../../assets/icons/love.png';
import avatar from '../../assets/icons/avatar.png';
import guitar from '../../assets/icons/guita.png';
import google_icon from '../../assets/icons/google.png'
import mobile_icon from '../../assets/icons/mobile.svg'

import "./AuthModal.css";

const slides = [
  {
    image: love,
    text: "Chat instantly with buyers and sellers.",
  },
  {
    image: avatar,
    text: "Buy and sell with trusted people near you.",
  },
  {
    image: guitar,
    text: "Sell faster with real photos of your item.",
  },
];

function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [slideIndex, setSlideIndex] = useState(1);
  const [view, setView] = useState("options"); // options | phone | email

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setView("options");
    closeAuthModal();
  };

  const prevSlide = () =>
    setSlideIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const nextSlide = () =>
    setSlideIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-overlay" onClick={handleClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={handleClose}>
          ×
        </button>

        {view === "options" && (
          <>
            <div className="auth-carousel">
              <button className="carousel-arrow" onClick={prevSlide}>
                ‹
              </button>

              <div className="carousel-content">
                <img
                  src={slides[slideIndex].image}
                  alt="onboarding"
                  className="carousel-image"
                />
                <p className="carousel-text">{slides[slideIndex].text}</p>

                <div className="carousel-dots">
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      className={`dot ${i === slideIndex ? "active" : ""}`}
                      onClick={() => setSlideIndex(i)}
                    />
                  ))}
                </div>
              </div>

              <button className="carousel-arrow" onClick={nextSlide}>
                ›
              </button>
            </div>

            <button
              className="auth-option-btn outlined"
              onClick={() => setView("phone")}
            >
              <img
                src={mobile_icon}
                alt="phone"
                className="option-icon"
              />
              Continue with phone
            </button>

            <button className="auth-option-btn" onClick={handleGoogleLogin}>
              <img
                src={google_icon}
                alt="google"
                className="option-icon"
              />
              Continue with Google
            </button>

            <div className="auth-divider">OR</div>

            <button
              className="auth-link-btn"
              onClick={() => setView("email")}
            >
              Login with Email
            </button>

            <p className="auth-footer-note">
              All your personal details are safe with us.
            </p>
            <p className="auth-footer-terms">
              If you continue, you are accepting{" "}
              <a href="/terms">OLX Terms and Conditions</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </p>
          </>
        )}

        {view === "phone" && (
          <PhoneAuth onBack={() => setView("options")} onSuccess={handleClose} />
        )}

        {view === "email" && (
          <EmailAuth onBack={() => setView("options")} onSuccess={handleClose} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;