import { useState } from "react";
import { login, register } from "../utils/api";

function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pathParts = window.location.pathname
    .split("/")
    .filter(Boolean);

  const referralCode =
  pathParts[0] === "referral" && pathParts[1]
    ? pathParts[1]
    : "";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        if (!name.trim()) {
          throw new Error("Name is required");
        }

        await register(
          email,
          password,
          name,
          referralCode
        );

        const loginData = await login(email, password);

        onLogin(loginData);
        return;
      }

      const data = await login(email, password);
      onLogin(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setMode(mode === "login" ? "register" : "login");
    setError("");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "350px",
          padding: "30px",
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <h2>VELOOP {mode === "login" ? "Login" : "Register"}</h2>

        {mode === "register" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
          }}
        />

        {mode === "register" && referralCode && (
          <p style={{ fontSize: "14px" }}>
            Referral code: <strong>{referralCode}</strong>
          </p>
        )}

        {error && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>

        <button
          type="button"
          onClick={switchMode}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          {mode === "login"
            ? "Create a new account"
            : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;