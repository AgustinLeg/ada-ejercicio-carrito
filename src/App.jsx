import { useState } from "react";
import NavBar from "./components/navbar";
import ListProducts from "./components/product/ListProducts";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  return (
    <>
      <NavBar cartItems={cartItems} />
      <ListProducts addToCart={addToCart} />
    </>
  );
}

export default App;
