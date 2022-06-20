import {
  Flex,
  FormLabel,
  Button,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";

import { EmailIcon, LockIcon } from '@chakra-ui/icons'

import Input from '../components/Form/Input'


export default function Home() {
  return (

    <Flex w="100vw" h="100vh" align="center" justify="center">

      <Flex
        as="form"
        flexDirection="column"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        borderRadius={8}
        p={6}
        borderTop="4px"
        borderLeft="2px"
        borderColor="gray.400"

      >

        <Stack spacing="4">

          <Input
            name="email"
            label="email"
            type="email"
            icon={<EmailIcon color="blue.400" />}
          />

          <Input
            name="password"
            label="Senha"
            type="password"
            icon={<LockIcon color="blue.400" />} />

          <Button
            type="submit"
            bg="blue.600"
            _hover={{
              bg: "blue.400"
            }}>Entrar</Button>
        </Stack>

      </Flex>

    </Flex >

  )

}

