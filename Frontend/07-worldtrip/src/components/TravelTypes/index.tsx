import { useBreakpointValue } from '@chakra-ui/react';
import { TravelTypesMd } from './TravelTypesMd';
import { TravelTypesSm } from './TravelTypesSm';

export const TravelTypes = () => {
  const variant = useBreakpointValue({ base: 'tablet', md: 'HD' });

  return <>{variant === 'tablet' ? <TravelTypesSm /> : <TravelTypesMd />}</>;
};
