import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { FRONTEND_URL } from "../config";

const items = [
  { label: "Dashboard", to: "/" },
  { label: "Orders", to: "/orders" },
  { label: "Holdings", to: "/holdings" },
  { label: "Positions", to: "/positions" },
  { label: "Funds", to: "/funds" },
  { label: "Apps", to: "/apps" },
];

const Menu = () => {
  const { pathname } = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const isSelected = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <div className="menu-container">
      <img src="/logo.png" style={{ width: "50px" }} alt="TradeSphere" />
      <div className="menus">
        <ul>
          {items.map((item) => (
            <li key={item.to}>
              <Link style={{ textDecoration: "none" }} to={item.to}>
                <p className={isSelected(item.to) ? activeMenuClass : menuClass}>
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div
          className="profile"
          onClick={handleProfileClick}
          style={{ position: "relative" }}
        >
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "115%",
                right: 0,
                background: "#fff",
                border: "1px solid #eee",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                padding: "10px 16px",
                zIndex: 200,
                whiteSpace: "nowrap",
              }}
            >
              <a
                href={FRONTEND_URL}
                style={{
                  textDecoration: "none",
                  color: "rgb(65, 132, 243)",
                  fontSize: "0.9rem",
                }}
              >
                &larr; Back to website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
