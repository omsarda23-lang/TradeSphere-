import React from "react";
import { Link } from "react-router-dom";

import Status from "./Status";
import useApi from "../hooks/useApi";
import { inr, timeFromId } from "../utils";

const Orders = () => {
  const { data: orders, loading, error } = useApi("/allOrders");

  if (!loading && !error && orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      <Status loading={loading} error={error} />

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Value</th>
            </tr>

            {orders.map((order, index) => (
              <tr key={order._id || index}>
                <td>{timeFromId(order._id)}</td>
                <td className={order.mode === "SELL" ? "loss" : ""}>
                  <b style={order.mode === "BUY" ? { color: "#4184f3" } : null}>
                    {order.mode}
                  </b>
                </td>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{inr(order.price)}</td>
                <td>{inr(Number(order.price) * Number(order.qty))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
