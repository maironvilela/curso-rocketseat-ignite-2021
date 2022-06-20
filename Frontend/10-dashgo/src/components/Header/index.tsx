import { Button, Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react"
import { MdDehaze, MdMenu } from "react-icons/md";

import { Logo } from "./Logo";
import { Search } from "./Search";
import { Controls } from "./Controls";
import { Avatar } from "./Avatar";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";

export function Header() {

  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true,
  })

  return (

    <Flex
      as="header"
      mx="auto"
      width="100vw"
      px='10'
      py="5"
      mb="8"
    >
      <IconButton
        aria-label="Open Menu"
        variant="unstyled"
        fontSize="20"
        size="20"
        mr="4"
        mt="1"
        border="none"
        _focus={{ bg: "transparent" }}
        icon={<MdMenu />}
        onClick={onOpen}
      />



      <Logo />



      <Search showSearch={isMediumVersion} />

      <Controls />

      <Avatar showProfileData={isWideVersion} />

    </Flex >


  )
}