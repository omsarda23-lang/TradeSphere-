import React from "react";
import Menu from "./Menu";

const TopBar = ({ user }) => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">24,218.70</p>
          <p className="percent">+0.42%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">79,642.34</p>
          <p className="percent">+0.38%</p>
        </div>
      </div>
      <Menu user={user} />
    </div>
  );
};

export default TopBar;
