import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Checkbox,
  Button,
  Heading,
  Icon,
  SimpleGrid,
  VStack,
  HStack
} from "@chakra-ui/react";
import Head from 'next/head'
import { FiEdit, FiPlus, FiSave, FiSlash } from "react-icons/fi";
import Input from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";


export default function createUsers() {
  return (

    <>
      <Head>
        <title> dashgo | Criar Usuario</title>
      </Head>

      <Flex h="100vh" flexDirection="column" >
        <Header />

        <Flex maxWidth={1480} mx="auto" w='90vw' >
          <Sidebar />

          <Box flex="1" bg="gray.800" p="5" >

            <Box display="flex" flexDirection="column" pb="6">
              <Heading fontSize="lg" mb="5" pb="5" borderColor="whiteAlpha.100" borderBottomWidth="1px">Criar Usuario</Heading>

              <VStack spacing="8">
                <SimpleGrid
                  minChildWidth="240px"
                  spacing={5}
                  flexDirection="column"
                  w="100%">
                  <Input name="name" label="Nome Completo" />
                  <Input name="email" label="Email" type="email" />
                </SimpleGrid>

                <SimpleGrid
                  minChildWidth="240px"
                  spacing={5}
                  flexDirection="column"
                  w="100%">
                  <Input name="password" label="Senha" type="password" />
                  <Input name="confirmation-password" label="Confirma Senha" type="password" />
                </SimpleGrid>


              </VStack>

              <HStack mt="6" ml="auto"  >

                <Button
                  w="100px"
                  pl="2"
                  size="sm"
                  background="gray.600"
                  _hover={{ background: "gray.400" }}
                  transition="0.8s"
                  leftIcon={<Icon as={FiSlash} />}>
                  Cancelar
                </Button>

                <Button
                  w="100px"
                  pl="2"
                  size="sm"
                  background="blue.600"
                  _hover={{ background: "blue.400" }}
                  transition="0.8s"
                  leftIcon={<Icon as={FiSave} />}>
                  Salvar
                </Button>

              </HStack>


            </Box>

          </Box>
        </Flex>

      </Flex >
    </>

  )
}