import { Box, Flex, Image, Text } from '@chakra-ui/react';
import styles from './card.module.scss';

interface CardProps {
  cityImageUrl: string;
  cityName: string;
  countryName: string;
  countryFlag: string;
}

export const Card = ({
  cityImageUrl,
  cityName,
  countryName,
  countryFlag,
}: CardProps) => {
  return (
    <Flex flexDirection="column" className={styles.container}>
      <Box>
        <Image src={cityImageUrl} className={styles.image} />
      </Box>
      <Flex justify="space-between" p="1rem" className={styles.county_info}>
        <Flex flexDirection="column">
          <Text>{cityName}</Text>
          <Text mt="1rem" color="#999999">
            {countryName}
          </Text>
        </Flex>
        <Flex ml="auto">
          <Image src={countryFlag} className={styles.flag} />
        </Flex>
      </Flex>
    </Flex>
  );
};
