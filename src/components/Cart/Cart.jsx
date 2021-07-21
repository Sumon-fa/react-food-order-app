import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem.jsx";
import CartContext from "../../Store/cart-context";
import classes from "./Cart.module.css";
import CheckOut from "./CheckOut";
function Cart(props) {
  const [isCheckOut, setCheckOut] = useState(false);
  const [isSubmitting, setIssSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const crtx = useContext(CartContext);
  const totalAmount = `$${crtx.totalAmount.toFixed(2)}`;
  const hasItems = crtx.items.length > 0;
  function cartItemRemoveHandler(id) {
    crtx.removeItem(id);
  }
  function cartItemAddHandler(item) {
    crtx.addItem({ ...item, amount: 1 });
  }
  function orderHandler() {
    setCheckOut(true);
  }
  const submitOrderHandler = async (userdata) => {
    setIssSubmitting(true);
    await fetch(
      "https://react-http-e353e-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userdata,
          orderedItems: crtx.items,
        }),
      }
    );
    setIssSubmitting(false);
    setDidSubmit(true);
    crtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {crtx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          amount={item.amount}
          name={item.name}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalCantent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button--alt"]}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalCantent}
    </Modal>
  );
}
export default Cart;
