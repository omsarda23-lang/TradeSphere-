import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import GeneralContext from "./GeneralContext";
import { api } from "../api";
import { inr } from "../utils";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode, price }) => {
  const { closeWindow } = useContext(GeneralContext);
  const navigate = useNavigate();

  const [stockQuantity, setStockQuantity] = useState("1");
  const [stockPrice, setStockPrice] = useState(String(price ?? 0));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isBuy = mode !== "SELL";
  const value = Number(stockQuantity) * Number(stockPrice);

  const handleOrderClick = async () => {
    const qty = Number(stockQuantity);
    const orderPrice = Number(stockPrice);

    if (!Number.isInteger(qty) || qty < 1) {
      setError("Quantity must be a whole number of 1 or more.");
      return;
    }
    if (!Number.isFinite(orderPrice) || orderPrice < 0) {
      setError("Price must be 0 or more.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      await api.post("/newOrder", {
        name: uid,
        qty,
        price: orderPrice,
        mode: isBuy ? "BUY" : "SELL",
      });
      closeWindow();
      navigate("/orders"); // show the saved order straight away
    } catch (err) {
      setError("Could not place the order. Please try again in a moment.");
      setBusy(false);
    }
  };

  return (
    <div className="container" id="buy-window">
      <div className="regular-order">
        <h4 className="window-title">
          {isBuy ? "Buy" : "Sell"} {uid}
        </h4>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        {error ? (
          <span className="window-error">{error}</span>
        ) : (
          <span>
            Order value ₹{inr(Number.isFinite(value) ? value : 0)}
          </span>
        )}
        <div>
          <button
            type="button"
            className={isBuy ? "btn btn-blue" : "btn btn-red"}
            onClick={handleOrderClick}
            disabled={busy}
          >
            {busy ? "Placing..." : isBuy ? "Buy" : "Sell"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={closeWindow}
            disabled={busy}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
