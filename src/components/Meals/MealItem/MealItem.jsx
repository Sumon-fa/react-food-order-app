import React, { useContext } from "react";
import MealsItemForm from "./MealItemForm";
import classes from "./MealsItem.module.css";
import CartContext from "../../../Store/cart-context.jsx";
function MealsItem(props) {
  const crtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  function addCartHandler(amount) {
    crtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsItemForm onAddToCart={addCartHandler} />
      </div>
    </li>
  );
}
export default MealsItem;
