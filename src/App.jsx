import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./Store/CartContextProvider";

function App() {
  const [cartShow, setCartShow] = useState(false);
  function showCartHandler() {
    setCartShow(true);
  }
  function hideCartHandler() {
    setCartShow(false);
  }

  return (
    <CartContextProvider>
      <Header onShow={showCartHandler} />
      {cartShow && <Cart onClose={hideCartHandler} />}

      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
