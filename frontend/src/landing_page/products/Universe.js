import React from "react";
import { Link } from "react-router-dom";

const partners = [
  { name: "Zerodha Fundhouse", logo: "zerodhaFundhouse.png", text: "Our asset management venture creating simple, transparent index funds" },
  { name: "Sensibull", logo: "sensibullLogo.svg", text: "Options trading platform to build strategies and analyse positions" },
  { name: "Streak", logo: "streakLogo.png", text: "Systematic trading platform to build and backtest strategies" },
  { name: "smallcase", logo: "smallcaseLogo.png", text: "Thematic investment platform" },
  { name: "GoldenPi", logo: "goldenpiLogo.png", text: "Investment platform for bonds and fixed-income products" },
  { name: "Ditto", logo: "dittoLogo.png", text: "Insurance advice platform" },
];

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        {partners.map((p) => (
          <div className="col-12 col-md-4 p-3 mt-5" key={p.logo}>
            <img
              src={"media/images/" + p.logo}
              alt={p.name}
              style={{ height: "40px", width: "auto", maxWidth: "100%" }}
            />
            <p className="text-small text-muted mt-3">{p.text}</p>
          </div>
        ))}
        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", minWidth: "180px", margin: "0 auto" }}
        >
          Signup Now
        </Link>
      </div>
    </div>
  );
}

export default Universe;
