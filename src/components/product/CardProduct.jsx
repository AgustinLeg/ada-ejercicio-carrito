import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Button,
  Text,
} from "@chakra-ui/react";

function CardProduct({ item, addToCart }) {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      w="100%"
      maxW="300px"
      h="sm"
      p={2}
      d="flex"
      flexDirection="column"
    >
      <Box h="50%">
        <Image
          src={item.image}
          alt={`Picture of ${item.name}`}
          roundedTop="lg"
          objectFit="cover"
          height="full"
          margin="auto"
        />
      </Box>

      <Box p="6" flex="1 auto">
        <Box d="flex" alignItems="baseline">
          {item.isNew && (
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              New
            </Badge>
          )}
        </Box>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="lg"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {item.title}
          </Box>
        </Flex>

        <Flex justifyContent="space-between" alignContent="center">
          <Box fontSize="xl" color={useColorModeValue("gray.800", "white")}>
            <Text as="span" color={"gray.600"} fontSize="lg">
              $
            </Text>
            {item.price}
          </Box>
        </Flex>
      </Box>
      <Button
        w="full"
        colorScheme="blue"
        mt={2}
        onClick={() => addToCart(item)}
      >
        Agregar al carrito
      </Button>
    </Box>
  );
}

export default CardProduct;
