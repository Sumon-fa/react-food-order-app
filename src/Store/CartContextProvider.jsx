import React from "react";
import CartContext from "./CartContext";
function CartContextProvider(props) {
  function addItemCartHandler(item) {}
  function removeItemCartHandler(id) {}

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
