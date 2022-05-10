import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Text,
  Image,
  VStack,
  useColorMode,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';

import {
  BsMoonStarsFill,
  BsSun,
  BsCartFill,
  BsFillTrashFill,
} from 'react-icons/bs';

import Logo from '../../assets/iso_blanco.svg';

const Links = ['Inicio', 'Productos', 'Contacto'];

const ButtonToggleColor = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      px={5}
      aria-label="Toggle Color Mode"
      onClick={toggleColorMode}
      _focus={{ boxShadow: 'none' }}
      w="fit-content"
      {...props}
    >
      {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  );
};

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

const NavBar = ({ cart, handleDelete, handleClear }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { total, items } = cart;

  return (
    <>
      <SimpleGrid
        templateColumns="100px 1fr auto"
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        alignItems="center"
        position="fixed"
        top="0"
        left="0"
        w="full"
        zIndex={2}
        h={14}
        boxShadow="md"
      >
        {/* NavBar */}
        <Flex gap={2} align="flex-end">
          <Image src={Logo} alt="logo ada" w="20px" />
          <Heading as="h1" fontSize="lg">
            AdaShop
          </Heading>
        </Flex>
        <HStack
          as={'nav'}
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          justify="center"
        >
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
        </HStack>
        <Flex justifyContent="flex-end" gap={4}>
          <ButtonToggleColor size="20px" />
          <Button
            colorScheme="black"
            variant="ghost"
            onClick={onOpen}
            leftIcon={<BsCartFill size="20px" />}
          >
            {`(${items.length})`}
          </Button>
        </Flex>
      </SimpleGrid>

      {/* Menu carrito */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrito</DrawerHeader>
          {items.length > 0 ? (
            <>
              <DrawerBody>
                <VStack
                  spacing={10}
                  maxH="75vh"
                  overflow="auto"
                  align="flex-start"
                >
                  {items.map((item, index) => (
                    <Flex key={`item-carrito-${item.id}-${index}`} gap={2}>
                      <Image
                        src={item.image}
                        alt={`image of product ${item.title}`}
                        w="75px"
                        objectFit="cover"
                      />
                      <Box>
                        <Heading as="h3" size="sm">
                          {item.title}
                        </Heading>
                        <Text fontWeight="bold">${item.price}</Text>
                        <Text>
                          {item.quantity}{' '}
                          {item.quantity === 1 ? 'unidad' : 'unidades'}
                        </Text>
                      </Box>
                      <IconButton
                        variant="ghost"
                        colorScheme="red"
                        icon={<BsFillTrashFill />}
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      />
                    </Flex>
                  ))}
                </VStack>
              </DrawerBody>

              <DrawerFooter flexDirection="column">
                <Button
                  onClick={handleClear}
                  w="full"
                  variant="outline"
                  colorScheme="red"
                  mb={5}
                  rightIcon={<BsFillTrashFill />}
                >
                  Vaciar carrito
                </Button>
                <Flex justify="space-between" w="full" align="center">
                  <Text
                    textAlign="start"
                    w="full"
                    fontSize="2xl"
                    fontWeight="bold"
                  >
                    Total:
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold">
                    ${total.toFixed(2)}
                  </Text>
                </Flex>
              </DrawerFooter>
            </>
          ) : (
            <DrawerBody>
              <Text>No hay productos en el carrito ☹️ </Text>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
