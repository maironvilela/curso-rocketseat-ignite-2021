import { MdAssignmentInd, MdPowerSettingsNew } from "react-icons/md";

import {
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Avatar as ChakraAvatar,
  Icon
} from "@chakra-ui/react";



interface AvatarProps {
  showProfileData: boolean;
}

export const Avatar = ({ showProfileData }: AvatarProps) => (
  <Flex align="center">

    {showProfileData && (
      <Text mr="3" textAlign="end">Mairon Vilela
        <Text fontSize="xs" color="gray.400">maironvilela@gmail.com</Text>
      </Text>
    )}


    <Menu>
      <MenuButton
        as='button'
        bg="transparent"
        borderRadius='100'
        w='15'
      >
        <ChakraAvatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov" size='md' />

      </MenuButton >
      <MenuList
        bg="gray.800"
        _selected={{ bg: "gray.700", fontWeight: "bold" }}>

        <MenuItem _hover={{ bg: "gray.700", fontWeight: "bold" }} _focus={{ bg: 'gray.700', fontWeight: "bold" }} >
          <Icon as={MdAssignmentInd} mr="1" fontSize="20" /> Perfil
        </MenuItem>
        <MenuItem _hover={{ bg: "gray.700", fontWeight: "bold" }}>
          <Icon as={MdPowerSettingsNew} mr="1" fontSize="20" /> Sair
        </MenuItem>

        <MenuDivider />

      </MenuList>
    </Menu>


  </Flex >

)