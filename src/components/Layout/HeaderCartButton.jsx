import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon.jsx";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/cart-context.jsx";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlited, setBtnisHighlited] = useState(false);
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  const btnClass = `${classes.button} ${btnIsHighlited && classes.bump}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnisHighlited(true);
    const timer = setTimeout(() => {
      setBtnisHighlited(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  return (
    <button className={btnClass} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCartButton;
