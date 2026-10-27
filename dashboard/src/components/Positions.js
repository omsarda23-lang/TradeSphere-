import React from "react";

import Status from "./Status";
import useApi from "../hooks/useApi";

const Positions = () => {
  const { data: positions, loading, error } = useApi("/allPositions");

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>
      <Status loading={loading} error={error} />

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>

            {positions.map((stock, index) => {
              const curValue = Number(stock.price) * Number(stock.qty);
              const isProfit =
                curValue - Number(stock.avg) * Number(stock.qty) >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg).toFixed(2)}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - Number(stock.avg) * Number(stock.qty)).toFixed(
                      2
                    )}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
