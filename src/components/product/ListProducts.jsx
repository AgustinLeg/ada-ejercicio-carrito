import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import CardProduct from './CardProduct';
import HeartButton from './HeartButton';
import items from './items';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const ITEM_FOR_PAGE = 5;

const ListProducts = ({ addToCart }) => {
  const [onlyFav, setOnlyFav] = useState(false);
  const [products, setProducts] = useState(items);
  const [productsFilter, setProductsFilter] = useState(products);
  const [input, setInput] = useState('');

  const [page, setPage] = useState(1);

  const lastPage = Math.ceil(productsFilter.length / ITEM_FOR_PAGE);
  const offset = ITEM_FOR_PAGE * (page - 1);

  console.log(
    { page, lastPage, offset },
    productsFilter.slice(offset, ITEM_FOR_PAGE * page)
  );
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
          {productsFilter.slice(offset, ITEM_FOR_PAGE * page).map((item) => (
            <CardProduct
              key={item.id}
              item={item}
              addToCart={addToCart}
              toggleFavProduct={toggleFavProduct}
            />
          ))}
        </Flex>
        <Center my={10}>
          <Button
            disabled={page === 1}
            onClick={() => {
              page !== 1 && setPage(page - 1);
            }}
          >
            <ChevronLeftIcon></ChevronLeftIcon>
          </Button>
          <Button
            disabled={page === lastPage}
            onClick={() => {
              page !== lastPage && setPage(page + 1);
            }}
          >
            <ChevronRightIcon></ChevronRightIcon>
          </Button>
        </Center>
      </Box>
    </Container>
  );
};

export default ListProducts;
