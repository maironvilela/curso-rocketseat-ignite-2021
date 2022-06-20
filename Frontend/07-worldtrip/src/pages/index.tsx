import { Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Banner } from '~/components/Banner';
import { Slider } from '~/components/Slider';
import { SlideTitle } from '~/components/SlideTitle';
import { TravelTypes } from '~/components/TravelTypes';
import { api } from '~/services/axios';

type Continent = {
  id: string;
  name: string;
  imageUrl: string;
  summary: string;
  description: string;
 }
interface HomeProps{
  continents: Continent[]
}

export default function Home({continents}: HomeProps) {

  return (
    <Flex
      justify="center"
      align="center"
      direction="column">

      <Flex  justify="center"
        align="center"
        direction="column">

        <section>
          <Banner />
        </section>

        <section>
          <TravelTypes />
        </section>

        <section>
          <SlideTitle />
          <Slider continentsInfo={continents}/>
        </section>
      </Flex>

    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () =>{

  const response = await api.get('continents');

  return {
    props:{
      continents: response.data
    }
  }

}

