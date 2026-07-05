import { useState } from "react";
import { setupRecaptcha, sendOtp, verifyOtp } from "../../services/auth";
import "./PhoneAuth.css";

function PhoneAuth({ onBack, onSuccess }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState("enter-phone"); // enter-phone | enter-otp
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setError("");
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    try {
      const recaptchaVerifier = setupRecaptcha("recaptcha-container");
      const result = await sendOtp(`+91${phone}`, recaptchaVerifier);
      setConfirmationResult(result);
      setStep("enter-otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await verifyOtp(confirmationResult, otp);
      onSuccess();
    } catch (err) {
      setError("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="phone-auth">
      <button className="back-btn" onClick={onBack}>
        ‹ Back
      </button>

      <h3>{step === "enter-phone" ? "Enter your phone number" : "Enter OTP"}</h3>

      {step === "enter-phone" && (
        <>
          <div className="phone-input-row">
            <span className="country-code">+91</span>
            <input
              type="tel"
              placeholder="10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button
            className="auth-primary-btn"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {step === "enter-otp" && (
        <>
          <p className="otp-subtext">OTP sent to +91{phone}</p>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="otp-input"
          />
          {error && <p className="auth-error">{error}</p>}
          <button
            className="auth-primary-btn"
            onClick={handleVerifyOtp}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </>
      )}

      {/* Required invisible container for Firebase reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default PhoneAuth;