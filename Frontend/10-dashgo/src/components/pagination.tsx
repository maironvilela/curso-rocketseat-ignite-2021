import { Box, Button, HStack, Text } from "@chakra-ui/react";

export default function Pagination() {
  return (

    <Box mt="5"
      display="flex"
      align="center"
      justify="space-between"
    >

      <Box>
        <Text>Pagina 1 de 100</Text>
      </Box >

      <HStack spacing="1"

        ml="auto"
        display="flex"
        align="center"
        justify="space-between" >
        <Button
          size="sm"
          background="pink.600"
          _hover={{ cursor: "not-allowed" }}
          transition="0.8s"
          disabled={true}
          color="white">
          1
        </Button>

        <Button
          ml="auto"
          size="sm"
          background="blue.600"
          _hover={{ bg: "blue.400" }}
          transition="0.8s"
          color="white">
          2
        </Button>
        <Button
          ml="auto"
          size="sm"
          background="blue.600"
          _hover={{ bg: "blue.400" }}
          transition="0.8s"
          color="white">
          3
        </Button>
        <Button
          ml="auto"
          size="sm"
          background="blue.600"
          _hover={{ bg: "blue.400" }}
          transition="0.8s"
          color="white">
          4
        </Button>
        <Button
          ml="auto"
          size="sm"
          background="blue.600"
          _hover={{ bg: "blue.400" }}
          transition="0.8s"
          color="white">
          ...
        </Button>
      </HStack>

    </Box >




  )
}