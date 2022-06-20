import { Flex, Image, Link, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
interface ContinentImageProps {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  summary?: string;
}
export const ContinentImage = ({
  name,
  imageUrl,
  summary,
  id,
}: ContinentImageProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      mt="1rem"
      className={styles.container}
    >
      <Image
        src={imageUrl}
        width="100vw"
        height="400px"
        filter="brightness(0.6)"
      />

      <Flex
        width="400px"
        height="100px"
        flexDirection="column"
        align="center"
        justify="center"
        position="absolute"
      >
        <Link href={`/continents/${id}`} className={styles.link}>
          <Text fontSize="4.8rem" color="#FFFFFF">
            {name}
          </Text>
        </Link>

        <Text
          mt="2rem"
          align="center"
          color="#DADADA"
          fontSize="2.4rem"
          fontWeight="bold"
        >
          {' '}
          {summary}{' '}
        </Text>
      </Flex>
    </Flex>
  );
};
