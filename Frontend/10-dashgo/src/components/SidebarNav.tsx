
import { Box, Link, Stack, Text } from "@chakra-ui/react";

import { Icon } from "@chakra-ui/icons";
import { FiGrid, FiUsers, FiTrello, FiRefreshCcw } from 'react-icons/fi'

export const SidebarNav = () => (
  <Stack spacing="8" align="flex-start">
    <Box>
      <Text fontSize="small" color="gray.400" mb="6">GERAL</Text>
      <Stack spacing="8" align="stretch" >
        <Link display="flex" alignItems="center" href="dashboard" >
          <Icon as={FiGrid} fontSize="20" fontWeight="medium" />
          <Text as="span" ml="2">Dashboard</Text>
        </Link>

        <Link display="flex" alignItems="center" href="users">
          <Icon as={FiUsers} fontSize="20" fontWeight="medium" />
          <Text as="span" ml="2">Usuarios</Text>
        </Link>
      </Stack>

    </Box>

    <Box>
      <Text fontSize="small" color="gray.400" mb="6">AUTOMAÇÃO</Text>
      <Stack spacing="8" align="stretch" >
        <Link display="flex" alignItems="center" >
          <Icon as={FiTrello} fontSize="20" fontWeight="medium" />
          <Text as="span" ml="2">Formularios</Text>
        </Link>

        <Link display="flex" alignItems="center" >
          <Icon as={FiRefreshCcw} fontSize="20" fontWeight="medium" />
          <Text as="span" ml="2">Automação</Text>
        </Link>
      </Stack>

    </Box>
  </Stack>
)