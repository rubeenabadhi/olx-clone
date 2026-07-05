import { useState } from "react";
import { loginWithEmail, signupWithEmail } from "../../services/auth";
import "./EmailAuth.css";

function EmailAuth({ onBack, onSuccess }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-auth">
      <button className="back-btn" onClick={onBack}>
        ‹ Back
      </button>

      <h3>{mode === "login" ? "Login with Email" : "Create an account"}</h3>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="email-input"
      />

      {error && <p className="auth-error">{error}</p>}

      <button
        className="auth-primary-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : mode === "login"
          ? "Login"
          : "Sign Up"}
      </button>

      <p className="switch-mode">
        {mode === "login" ? (
          <>
            New to OLX?{" "}
            <span onClick={() => setMode("signup")}>Create an account</span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span onClick={() => setMode("login")}>Login</span>
          </>
        )}
      </p>
    </div>
  );
}

export default EmailAuth;