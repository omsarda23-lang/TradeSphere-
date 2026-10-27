import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price) => {},
  openSellWindow: (uid, price) => {},
  closeWindow: () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  // null = window closed, otherwise { uid, mode, price }
  const [order, setOrder] = useState(null);

  const openBuyWindow = (uid, price) => setOrder({ uid, mode: "BUY", price });
  const openSellWindow = (uid, price) => setOrder({ uid, mode: "SELL", price });
  const closeWindow = () => setOrder(null);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow,
        openSellWindow,
        closeWindow,
        closeBuyWindow: closeWindow,
      }}
    >
      {props.children}
      {order && (
        <BuyActionWindow
          key={order.uid + order.mode}
          uid={order.uid}
          mode={order.mode}
          price={order.price}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
