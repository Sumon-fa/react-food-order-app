import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon.jsx";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/CartContext";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  return (
    <button className={classes.button} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCartButton;
