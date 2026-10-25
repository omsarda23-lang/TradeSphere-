// Where the "Signup" buttons send people (your dashboard on Vercel).
// Set REACT_APP_DASHBOARD_URL in Vercel to override it.
export const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://trade-sphere-i36i.vercel.app");
