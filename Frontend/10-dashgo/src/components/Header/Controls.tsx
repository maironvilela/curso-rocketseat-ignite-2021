import { Flex, HStack, Icon } from "@chakra-ui/react";
import { FiBell, FiUserPlus } from "react-icons/fi";


export const Controls = () => (
  <Flex align="center" ml="auto">
    <HStack
      spacing={["3", "2", "6"]}
      borderRightWidth={1}
      borderColor="gray.400"
      py="1"
      pr="8"
      mx="9"
    >
      <Icon as={FiUserPlus} fontSize={["20"]} color="gray.400" />
      <Icon as={FiBell} fontSize={["20"]} color="gray.400" />
    </HStack>


  </Flex>
)