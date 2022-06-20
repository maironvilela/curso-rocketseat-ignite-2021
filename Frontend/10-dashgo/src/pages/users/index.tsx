import {
  Spinner,
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Checkbox,
  Button,
  Heading,
  Icon,
} from '@chakra-ui/react';

import Head from 'next/head';
import { FiEdit, FiPlus } from 'react-icons/fi';

import { Header } from '../../components/Header';
import Pagination from '../../components/pagination';
import { Sidebar } from '../../components/Sidebar';
import { useUsers } from '../../hooks/useUsers';

export default function usersList() {
  const { data, isLoading, error, isFetching } = useUsers();

  return (
    <>
      <Head>
        <title>dashgo | Lista Usuarios</title>
      </Head>

      <Flex h="100vh" flexDirection="column">
        <Header />

        <Flex maxWidth={1480} mx="auto" w="90vw">
          <Sidebar />

          <Box flex="1" bg="gray.800" p="5">
            <Box display="flex" justifyContent="space-between" pb="6">
              <Flex align="center">
                <Heading fontSize="lg">Usuários</Heading>

                {!isLoading && isFetching && (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="gray.500"
                    size="sm"
                    ml="2"
                  />
                )}
              </Flex>
              <Button
                as="a"
                size="sm"
                background="pink.600"
                _hover={{ background: 'pink.400' }}
                transition="0.8s"
                leftIcon={<Icon as={FiPlus} />}
              >
                Criar Novo
              </Button>
            </Box>

            {isLoading ? (
              <Flex justify="center" align="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            ) : error ? (
              <h1>Falha ao carregar dados</h1>
            ) : (
              <>
                <Table size="lg" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px="6" textAlign="left" width="4">
                        <Checkbox />
                      </Th>
                      <Th textAlign="left">USUÁRIOS</Th>
                      <Th textAlign="left">Data de Cadastro</Th>
                      <Th width="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map(user => (
                      <Tr key={user.id}>
                        <Td px="6">
                          <Checkbox />
                        </Td>
                        <Td>
                          <Text>
                            {user.name}
                            <Text fontSize="small" color="gray.500">
                              {user.email}
                            </Text>
                          </Text>
                        </Td>
                        <Td>{user.createdAt}</Td>
                        <Td>
                          <Button
                            as="a"
                            pl="2"
                            size="sm"
                            background="blue.600"
                            _hover={{ background: 'blue.400' }}
                            transition="0.8s"
                            leftIcon={<Icon as={FiEdit} />}
                          >
                            Editar
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Pagination />
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
