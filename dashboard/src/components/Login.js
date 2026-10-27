import React, { useState } from "react";
import api, { setToken, FRONTEND_URL } from "../api";

function Login() {
  const [form, setForm] = useState({ email: "demo@tradesphere.com", password: "Demo@123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/login", form);
      setToken(res.data.token);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Start the backend on port 3002.");
      setLoading(false);
    }
  };

  return (
    <div className="dash-login">
      <form className="dash-login-card" onSubmit={onSubmit}>
        <h2>TradeSphere</h2>
        <p>Log in to your trading dashboard</p>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={onChange} required />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={onChange} required />
        {error && <p className="dash-error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Log in"}
        </button>
        <a href={`${FRONTEND_URL}/signup`}>Create an account on the website</a>
      </form>
    </div>
  );
}

export default Login;
