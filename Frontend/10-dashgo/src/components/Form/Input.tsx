import { IconProps } from "@chakra-ui/core";
import { EmailIcon } from "@chakra-ui/icons";
import {
  ComponentWithAs,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from "@chakra-ui/react";
import { ReactNode } from "react";


interface InputProps extends ChakraInputProps {
  name: string,
  label?: string,
  icon?: ReactNode,
}

export default function Input({ name, label, icon, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <InputGroup>
        {!!icon && <InputLeftElement
          pointerEvents="none"
          children={icon}
        />}

        <ChakraInput id={name} name={name} {...rest} />
      </InputGroup>
    </FormControl>
  )
}