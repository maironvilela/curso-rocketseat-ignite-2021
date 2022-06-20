import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';

interface ContinentInfoProps {
  label: string;
  value: string;
}

export const ContinentInfo = ({ value, label }: ContinentInfoProps) => {
  const variant = useBreakpointValue({ base: 'tablet', md: 'HD' });

  return (
    <Flex flexDirection="column">
      <Text
        fontSize={variant === 'HD' ? '4.8rem' : '2.4rem'}
        fontWeight="semibold"
        color="#FFBA08"
      >
        {value}
      </Text>
      <Text fontSize={variant === 'HD' ? '2.4rem' : '1.8rem'}>{label}</Text>
    </Flex>
  );
};
