import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

export const Banner = () => {
  const variant = useBreakpointValue({ base: 'tablet', md: 'HD' });

  const containerHeight = 163;

  return (
    <Box>
      <Flex
        height={containerHeight}
        w="100vw"
        bgImage={
          variant === 'base'
            ? "url('/images/background-banner.png')"
            : "url('/images/background_hd.svg')"
        }
        bgPosition="center"
        alignItems="start"
        justify="center"
        direction="column"
        position="relative"
        mt="3rem"
        pb="5rem"
        pt="5rem"
      >
        <Text
          color="white"
          pl="1.6rem"
          fontWeight="500"
          fontSize={variant === 'tablet' ? '2rem' : '3.6rem'}
        >
          5 Continentes,
        </Text>
        <Text
          color="white"
          pl="1.6rem"
          fontWeight="500"
          fontSize={variant === 'tablet' ? '1.4rem' : '2rem'}
        >
          Infinitas Possibilidades
        </Text>

        <Text color="white" pl="1.6rem" fontSize="1.4rem" mt="1rem">
          Chegou a hora de tirar do papel a viagem que você sempre sonhou.
        </Text>

        {variant === 'HD' && (
          <Image
            src="./images/airplane.svg"
            position="absolute"
            right="10px"
            w="317px"
            h="200px"
          />
        )}
      </Flex>
    </Box>
  );
};
