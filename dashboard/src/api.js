import axios from "axios";

// Where the backend lives.
//  - On Vercel:  set REACT_APP_API_URL (Settings > Environment Variables)
//  - On your laptop it falls back to localhost:3002
//  - If the variable is missing on the live site it falls back to the Render backend
const isLocal =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export const API_URL = (
  process.env.REACT_APP_API_URL ||
  (isLocal ? "http://localhost:3002" : "https://tradesphere-ljnf.onrender.com")
).replace(/\/+$/, "");

// 90 s timeout: Render's free server can take about a minute to wake up.
export const api = axios.create({ baseURL: API_URL, timeout: 90000 });
