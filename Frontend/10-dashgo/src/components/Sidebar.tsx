import { Box, Link, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

import { Icon } from "@chakra-ui/icons";
import { FiGrid, FiUsers, FiTrello, FiRotateCw, FiRefreshCcw } from 'react-icons/fi'
import { SidebarNav } from "./SidebarNav";
import { SidebarDrawer } from "./SidebarDrawer";

export function Sidebar() {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  if (!isWideVersion) {
    return (
      <SidebarDrawer />
    )
  }

  return (

    <Box as="aside" w='32' mr='8'>
      <SidebarNav />
 
    </Box >


  )
}