import {
  Box,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  // eslint-disable-next-line prettier/prettier
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
}

interface CardProps {
  data: Card;
  viewImage: (url: string) => void;
}

export function Card({ data, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box
      key={data.ts}
      borderRadius="md"
      bgColor="pGray.800"
      ml="2rem"
      mb="2rem"
      w="290px"
      h="290px"
    >
      <Skeleton isLoaded={!isLoading}>
        <Image
          src={
            data.url
              ? data.url
              : 'data:image/jpeg;base64,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'
          }
          alt={data.title}
          w="100%"
          h={48}
          borderTopRadius="md"
          onClick={() => viewImage(data.url)}
          onLoad={() => setIsLoading(false)}
          cursor="pointer"
        />
      </Skeleton>

      <Box pt={5} pb={4} px={6}>
        {isLoading ? (
          <>
            <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
            <SkeletonText fontSize="md" mt={7} noOfLines={1} />
          </>
        ) : (
          <>
            <Heading fontSize="2xl">{data.title}</Heading>
            <Text mt={2.5} fontSize="md">
              {data.description}
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}
