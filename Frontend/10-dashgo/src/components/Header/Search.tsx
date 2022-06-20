import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputRightElement, Input } from "@chakra-ui/react";

interface SearchProps {
  showSearch: boolean;
}

export const Search = ({ showSearch }: SearchProps) => (

  <>
    {showSearch && (
      <InputGroup width="50vh">
        <InputRightElement display="flex" align="center"
          pointerEvents="none"
          children={<SearchIcon fontSize="20" color="gray.400" position="relative" />} />
        <Input
          width="50vh"
          minWidth="50vh"
          borderRadius="full"
          border={0}
          bg={"gray.800"}
          placeholder="Buscar na plataforma"

        />
      </InputGroup>
    )}

  </>
)