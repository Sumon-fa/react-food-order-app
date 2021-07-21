import React, { useReducer } from "react";
import CartContext from "./cart-context.jsx";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  if (action.type === "add") {
    const updatedTotalAmounts =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    console.log(existingCartItemIndex);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];

      updatedItems[existingCartItemIndex] = updatedItem;
      console.log(updatedItems[existingCartItemIndex]);
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };
  }
  if (action.type === "remove") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmounts = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };
  }
  if (action.type === "clear") {
    return defaultCartState;
  }
  return defaultCartState;
}

function CartContextProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  function addItemCartHandler(item) {
    dispatchCartAction({ type: "add", item: item });
  }
  function removeItemCartHandler(id) {
    dispatchCartAction({ type: "remove", id: id });
  }
  function clearCartItemHandler() {
    dispatchCartAction({ type: "clear" });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
    clearCart: clearCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
