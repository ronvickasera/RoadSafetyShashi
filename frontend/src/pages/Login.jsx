import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    if (!phone || !password) {
      alert("Enter phone number and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await login(phone, password);

      if (data.user.role === "SURVEYOR") navigate("/surveyor");
      else if (data.user.role === "OFFICER") navigate("/officer");
      else if (data.user.role === "ADMIN") navigate("/admin");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />

      <main className="auth-container">
        <form className="auth-card" onSubmit={handleLogin}>
          <h1>Road Safety Survey</h1>
          <h2>Login</h2>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))
              }
              placeholder="Phone Number"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            className="submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            className="secondary-button full-width"
            type="button"
            onClick={() => navigate("/register")}
          >
            Register New Account
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
