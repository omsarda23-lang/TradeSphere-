import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL, goToDashboard } from "../../config";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, form);
      goToDashboard(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || "Could not log in. Is the backend running?");
      setLoading(false);
    }
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="fs-2 mb-3">Log in to TradeSphere</h1>
          <p className="text-muted mb-4">
            Use your account to open the trading dashboard.
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button className="btn btn-primary fs-5 px-4" disabled={loading}>
              {loading ? "Signing in..." : "Log in"}
            </button>
          </form>
          <p className="mt-3 text-muted">
            New here? <Link to="/signup">Create an account</Link>
          </p>
          <p className="small text-muted">
            Demo login: demo@tradesphere.com / Demo@123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
