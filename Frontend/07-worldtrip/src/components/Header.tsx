import { Box, Image } from '@chakra-ui/react';

export const Header = () => {
  const containerHeight = 50;
  const imageHeight = 45;
  const imageWidth = 184;

  return (
    <Box height={containerHeight} w="100vw" align="center" pt="5">
      <Image
        src="/images/logo.svg"
        alt="Logo"
        htmlWidth={imageWidth}
        htmlHeight={imageHeight}
      />
    </Box>
  );
};
