import React from "react";
import MealsItemForm from "./MealItemForm";
import classes from "./MealsItem.module.css";

function MealsItem(props) {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsItemForm id={props.id} />
      </div>
    </li>
  );
}
export default MealsItem;
