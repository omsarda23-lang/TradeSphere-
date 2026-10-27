import React from "react";

import { VerticalGraph } from "./VerticalGraph";
import Status from "./Status";
import useApi from "../hooks/useApi";
import { inr } from "../utils";

// 31428.95 -> 31,428.<small>95</small>
const Big = ({ value }) => {
  const [whole, decimals] = inr(value).split(".");
  return (
    <>
      {whole}.<span>{decimals}</span>
    </>
  );
};

const Holdings = () => {
  const { data: allHoldings, loading, error } = useApi("/allHoldings");

  const totalInvestment = allHoldings.reduce(
    (sum, s) => sum + Number(s.avg) * Number(s.qty),
    0
  );
  const currentValue = allHoldings.reduce(
    (sum, s) => sum + Number(s.price) * Number(s.qty),
    0
  );
  const pnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment ? (pnl / totalInvestment) * 100 : 0;

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      <Status loading={loading} error={error} />

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>

            {allHoldings.map((stock, index) => {
              const curValue = Number(stock.price) * Number(stock.qty);
              const isProfit =
                curValue - Number(stock.avg) * Number(stock.qty) >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg).toFixed(2)}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - Number(stock.avg) * Number(stock.qty)).toFixed(
                      2
                    )}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            <Big value={totalInvestment} />
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            <Big value={currentValue} />
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={pnl < 0 ? { color: "rgb(224, 56, 56)" } : undefined}>
            {inr(pnl)} ({pnl >= 0 ? "+" : ""}
            {pnlPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
