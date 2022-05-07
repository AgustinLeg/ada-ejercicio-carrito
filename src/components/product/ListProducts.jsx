import { Flex } from "@chakra-ui/react";
import CardProduct from "./CardProduct";

const ListProducts = ({ products, addToCart }) => {
  return (
    <Flex
      mt={10}
      flexWrap="wrap"
      gap="50px"
      flexDirection="row"
      justify="center"
    >
      {products.map((item) => (
        <CardProduct key={item.id} item={item} addToCart={addToCart} />
      ))}
    </Flex>
  );
};

export default ListProducts;
