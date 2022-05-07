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
} from "@chakra-ui/react";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const NavBar = ({ cartItems }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      {/* NavBar */}
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>

        {/* Carrito */}
        <Button colorScheme="teal" onClick={onOpen}>
          Carrito {`(${cartItems.length})`}
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Carrito</DrawerHeader>

            <DrawerBody>
              <VStack spacing={5} maxH="75vh" overflow="auto">
                {cartItems.map((item, index) => (
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
                      <Text>${item.price}</Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Heading textAlign="start" w="full">
                Total:
              </Heading>
              <Heading>${total.toFixed(2)}</Heading>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default NavBar;
