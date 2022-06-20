import {
  Flex,
  Grid,
  GridItem,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { api } from '~/services/axios';
import { Card } from '../../components/Card';
import { ContinentImage } from '../../components/ContinentImage';
import { ContinentInfo } from '../../components/ContinentInfo';
import styles from './continent.module.scss';

type City = {
  id: string,
  name: string,
  imageUrl: string,
  country: {
    name: string,
    flag: string,
  },
};

type Continent = {
  id: string,
  name: string,
  imageUrl: string,
  summary: string,
  description: string,
  cities: City[],
  numberOfCountries: string,
  numberOfLanguages: string,
  numberOfCities: string,
};

interface ContinentsProps {
  continent: Continent;
}

export default function continents({ continent }: ContinentsProps) {
  const variant = useBreakpointValue({ base: 'tablet', md: 'HD' });

  return (
    <Flex
      className={styles.container}
      mt="2rem"
      mb="5rem"
      flexDirection="column"
    >
      <header className={styles.banner}>
        <ContinentImage
          name={continent.name}
          imageUrl={continent.imageUrl}
          id={continent.id}
          description={continent.description}
        />
      </header>

      <main>
        <Flex p="2rem" flexDirection="column">
          <Flex
            align="center"
            flexDirection={variant === 'HD' ? 'row' : 'column'}
          >
            <section>
              <Text
                p="2rem"
                fontSize={variant === 'HD' ? '2rem' : '1.4rem'}
                w={variant === 'HD' ? '55vw' : '100vw'}
              >
                {continent.description}
              </Text>
            </section>

            <section>
              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={4}
                align="center"
                mt="2rem"
              >
                <ContinentInfo
                  label="países"
                  value={continent.numberOfCountries}
                />
                <ContinentInfo
                  label="linguas"
                  value={continent.numberOfLanguages}
                />
                <ContinentInfo
                  label="cidades +100"
                  value={continent.numberOfCities}
                />
              </Grid>
            </section>
          </Flex>

          <section>
            <Text
              fontSize={variant === 'HD' ? '3.6rem' : '2.4rem'}
              color="#47585B"
              mt="3rem"
            >
              Cidades +100
            </Text>
            <Grid
              templateColumns={
                variant === 'HD' ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'
              }
              gap={6}
              align="center"
              mt="4rem"
            >
              {continent.cities.map(city => (
                <GridItem w="100%">
                  <Card
                    key={city.id}
                    cityImageUrl={city.imageUrl}
                    cityName={city.name}
                    countryName={city.country.name}
                    countryFlag={`/images/country/${city.country.flag}.png`}
                  />
                </GridItem>
              ))}
            </Grid>
          </section>
        </Flex>
      </main>
    </Flex>
  );
}

export const getStaticPaths = () => {
  const paths = [];
  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps: GetStaticProps = async params => {
  const { params: paramsId } = params;

  const response = await api.get(`continents/${paramsId.id}`);

  console.log(JSON.stringify(response.data, null, 2));

  return {
    props: { continent: response.data },
    revalidate: 60 * 60 * 24, // 24horas
  };
};
