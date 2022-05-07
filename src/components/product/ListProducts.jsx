import { useState } from "react";
import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import CardProduct from "./CardProduct";

const ListProducts = ({ products, addToCart }) => {
  const [productsFilter, setProductsFilter] = useState(products);

  const handleChange = (e) => {
    setProductsFilter(
      products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  return (
    <Box mt={5} p={2}>
      <Heading>Productos</Heading>
      <Box w={{base: "90vw", md: "50vw"}} mt={5}>
        <Input
          type="text"
          onChange={handleChange}
          placeholder="buscar producto por nombre"
          variant="filled"
        />
      </Box>
      <Flex
        mt={10}
        flexWrap="wrap"
        gap="50px"
        flexDirection="row"
        justify="center"
      >
        {productsFilter.map((item) => (
          <CardProduct key={item.id} item={item} addToCart={addToCart} />
        ))}
      </Flex>
    </Box>
  );
};

export default ListProducts;
