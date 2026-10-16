
import { useState } from "react";

const API_URL = "http://localhost:5000/api/auth";

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isSignup = mode === "signup";

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (isSignup && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignup ? "signup" : "login";

      const payload = isSignup
        ? { name: name.trim(), email: cleanEmail, password }
        : { email: cleanEmail, password };

      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      setMessage(data.message || "Success!");

      if (data.user && onAuthSuccess) {
        onAuthSuccess(data.user);
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    marginTop: "7px",
    borderRadius: "8px",
    border: "1px solid #334155",
    boxSizing: "border-box",
    background: "#0f172a",
    color: "#f8fafc",
    outline: "none",
    fontSize: "14px",
  };

  const labelStyle = {
    display: "block",
    marginTop: "16px",
    color: "#cbd5e1",
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        boxSizing: "border-box",
        background: "#020617",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "410px",
          padding: "32px",
          border: "1px solid #1e293b",
          borderRadius: "18px",
          background: "#0f172a",
          boxSizing: "border-box",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            display: "grid",
            placeItems: "center",
            borderRadius: "12px",
            background: "#4f46e5",
            fontSize: "23px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          L
        </div>

        <h1 style={{ margin: "0 0 8px", fontSize: "28px" }}>
          LinkPulse
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6 }}>
          {isSignup
            ? "Create your account and start shortening links."
            : "Welcome back! Sign in to your account."}
        </p>

        {isSignup && (
          <label style={labelStyle}>
            Full name
            <input
              style={inputStyle}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </label>
        )}

        <label style={labelStyle}>
          Email address
          <input
            style={inputStyle}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label style={labelStyle}>
          Password
          <input
            style={inputStyle}
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={8}
            required
          />
        </label>

        {isSignup && (
          <label style={labelStyle}>
            Confirm password
            <input
              style={inputStyle}
              type="password"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
        )}

        {error && (
          <p
            role="alert"
            style={{
              marginTop: "18px",
              padding: "11px",
              borderRadius: "8px",
              background: "#451a1a",
              color: "#fecaca",
              fontSize: "13px",
            }}
          >
            {error}
          </p>
        )}

        {message && (
          <p
            role="status"
            style={{
              marginTop: "18px",
              color: "#86efac",
              fontSize: "13px",
            }}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "13px",
            border: "none",
            borderRadius: "9px",
            background: loading ? "#4338ca" : "#6366f1",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading
            ? "Please wait..."
            : isSignup
              ? "Create Account"
              : "Sign In"}
        </button>

        <p
          style={{
            marginTop: "22px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          {isSignup
            ? "Already have an account? "
            : "Don't have an account? "}

          <button
            type="button"
            onClick={() => switchMode(isSignup ? "login" : "signup")}
            style={{
              padding: 0,
              border: "none",
              background: "transparent",
              color: "#a5b4fc",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {isSignup ? "Sign in" : "Sign up"}
          </button>
        </p>

        <p
          style={{
            marginBottom: 0,
            textAlign: "center",
            color: "#64748b",
            fontSize: "12px",
          }}
        >
          Email and password only. No OTP or magic link.
        </p>
      </form>
    </div>
  );
}
