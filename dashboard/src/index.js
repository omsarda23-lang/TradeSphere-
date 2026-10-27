import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Login from "./components/Login";
import api, { getToken, setToken } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      params.delete("token");
      const clean = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
      window.history.replaceState({}, "", clean);
    }

    const token = getToken();
    if (!token) {
      setReady(true);
      return;
    }

    api
      .get("/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setToken(""))
      .finally(() => setReady(true));
  }, []);

  if (!ready) return <p style={{ padding: 24 }}>Loading...</p>;
  if (!user) return <Login />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
