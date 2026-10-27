import React, { useEffect, useState } from "react";
import api from "../api";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [amount, setAmount] = useState(1000);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = () => {
    api
      .get("/funds")
      .then((res) => setFunds(res.data))
      .catch((err) => setError(err.response?.data?.error || "Could not load funds"));
  };

  useEffect(() => {
    load();
    const onUpdate = () => load();
    window.addEventListener("portfolio-updated", onUpdate);
    return () => window.removeEventListener("portfolio-updated", onUpdate);
  }, []);

  const updateFunds = async (action) => {
    setError("");
    setMessage("");
    try {
      const res = await api.post("/funds", { action, amount: Number(amount) });
      setFunds(res.data);
      setMessage(action === "withdraw" ? "Withdrawal successful" : "Funds added");
      window.dispatchEvent(new Event("portfolio-updated"));
    } catch (err) {
      setError(err.response?.data?.error || "Could not update funds");
    }
  };

  if (!funds) return <p>Loading funds...</p>;

  return (
    <>
      <div className="funds">
        <p>Paper-trading cash (not real money)</p>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: 120, marginRight: 8, padding: 8 }}
        />
        <button type="button" className="btn btn-green" onClick={() => updateFunds("add")}>
          Add funds
        </button>
        <button type="button" className="btn btn-blue" onClick={() => updateFunds("withdraw")}>
          Withdraw
        </button>
      </div>
      {error && <p className="dash-error">{error}</p>}
      {message && <p className="profit">{message}</p>}

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{Number(funds.available).toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{Number(funds.used).toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{Number(funds.available).toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{Number(funds.opening).toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>{Number(funds.payin).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
