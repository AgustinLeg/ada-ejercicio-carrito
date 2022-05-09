import { useEffect, useState } from "react";
import { Box, Container, Flex, Heading, Input, Text } from "@chakra-ui/react";
import CardProduct from "./CardProduct";
import HeartButton from "./HeartButton";

const items = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    isNew: true,
    fav: true,
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
    isNew: true,
    fav: false,
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
    isNew: false,
    fav: false,
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: {
      rate: 2.1,
      count: 430,
    },
    isNew: false,
    fav: true,
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
    isNew: false,
    fav: false,
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3.9,
      count: 70,
    },
    isNew: true,
    fav: false,
  },
];

const ListProducts = ({ addToCart }) => {
  const [onlyFav, setOnlyFav] = useState(false);
  const [products, setProducts] = useState(items);
  const [productsFilter, setProductsFilter] = useState(products);
  const [input, setInput] = useState("");

  useEffect(() => {
    setProductsFilter(
      products.filter(
        (product) =>
          (!input || product.title.toLowerCase().includes(input)) &&
          (!onlyFav || product.fav)
      )
    );
  }, [onlyFav, input, products]);

  const toggleFavProduct = (item) => {
    setProducts(
      products.map((product) => {
        if (item.id === product.id) {
          return { ...product, fav: !product.fav };
        }
        return product;
      })
    );
  };

  const handleOnChange = (e) => {
    const data = e.target.value.toLowerCase();
    setInput(data);
  };

  const toggle = () => {
    setOnlyFav(!onlyFav);
  };

  return (
    <Container maxW="container.xl">
      <Box mt={5} p={2}>
        <Flex alignItems="center">
          <Heading>Productos</Heading>
          <Text ml={3}>Solo Favoritos</Text>
          <HeartButton
            ml={3}
            isSelected={onlyFav}
            toggle={toggle}
          ></HeartButton>
        </Flex>
        <Input
          mt={5}
          type="text"
          onChange={handleOnChange}
          placeholder="Buscar producto por nombre"
          variant="filled"
        />
        <Flex
          mt={10}
          flexWrap="wrap"
          gap="50px"
          flexDirection="row"
          justify="center"
        >
          {productsFilter.map((item) => (
            <CardProduct
              key={item.id}
              item={item}
              addToCart={addToCart}
              toggleFavProduct={toggleFavProduct}
            />
          ))}
        </Flex>
      </Box>
    </Container>
  );
};

export default ListProducts;
