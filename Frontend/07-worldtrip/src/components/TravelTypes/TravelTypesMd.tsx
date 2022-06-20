import { Flex, Image } from '@chakra-ui/react';

export const TravelTypesMd = () => {
  return (
    <Flex mt="36px" pb="2" mb="5" justify="space-around" width="95vw">
      <Image src="./images/beach.svg" height="145px" width="85px" />
      <Image src="./images/classic.svg" />
      <Image src="./images/modern.svg" />
      <Image src="./images/more.svg" />
      <Image src="./images/nightlife.svg" />
    </Flex>
  );
};
