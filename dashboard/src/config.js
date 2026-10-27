// Where "Back to website" sends people (your landing site on Vercel).
// Set REACT_APP_FRONTEND_URL in Vercel to override it.
export const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://trade-sphere-tvpq-nine.vercel.app");
