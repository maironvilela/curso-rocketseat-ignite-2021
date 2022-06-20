import { Box, Grid, List, ListIcon, ListItem } from '@chakra-ui/layout';
import { FiCheckCircle } from 'react-icons/fi';
export const TravelTypesSm = () => {
  const travelList = ['vida noturna', 'praia', 'moderno', 'clássico'];

  return (
    <Box mt="36px" borderBottom="1px" borderColor="#47585B" pb="2" mb="5">
      <List spacing={3} pb="3">
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          {travelList.map(travel => (
            <ListItem key={Math.random()} fontSize="1.8rem" fontWeight="500">
              <ListIcon as={FiCheckCircle} color="green.500" />
              {travel}
            </ListItem>
          ))}
        </Grid>

        <ListItem
          fontSize="1.8rem"
          fontWeight="500"
          align="center"
          pt="5"
          ml="-5"
        >
          <ListIcon as={FiCheckCircle} color="green.500" />e mais...
        </ListItem>
      </List>
    </Box>
  );
};
