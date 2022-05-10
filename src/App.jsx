import { Box, useToast } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./components/navbar";
import ListProducts from "./components/product/ListProducts";
import { calcTotal } from "./utils";

function App() {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  const toast = useToast();

  const addToCart = (item) => {
    const itemExist = cart.items.some((cartItem) => cartItem.id === item.id);
    if (!itemExist) {
      const newItems = [...cart.items, { ...item, quantity: 1 }];
      const newTotal = calcTotal(newItems);
      return setCart({ total: newTotal, items: newItems });
    }
    const newItems = cart.items.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantity += 1;
      }
      return cartItem;
    });
    const newTotal = calcTotal(newItems);

    setCart({
      ...cart,
      total: newTotal,
      items: newItems,
    });
  };

  const handleDelete = (id) => {
    const newItems = cart.items.filter((item) => item.id !== id);
    const newTotal = calcTotal(newItems);
    setCart({
      ...cart,
      total: newTotal,
      items: newItems,
    });
    toast({
      title: "Producto eliminado",
      description: "Se ha eliminado el producto del carrito",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleClear = () => {
    setCart({
      items: [],
      total: 0,
    });
    toast({
      title: "Carrito vacío",
      description: "Se ha vaciado el carrito",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Box pt={16}>
      <NavBar
        cart={cart}
        handleDelete={handleDelete}
        handleClear={handleClear}
      />
      <ListProducts addToCart={addToCart} />
    </Box>
  );
}

export default App;
