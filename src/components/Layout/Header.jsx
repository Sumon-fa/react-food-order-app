import React, { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React-meals</h1>
        <HeaderCartButton onShow={props.onShow} />
      </header>
      <div className={classes["main-image"]}>
        <img className={classes.main} src={mealsImage} alt="" />
      </div>
    </Fragment>
  );
}

export default Header;
