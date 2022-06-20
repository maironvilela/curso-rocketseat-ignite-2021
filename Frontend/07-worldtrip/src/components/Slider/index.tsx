import { Flex } from '@chakra-ui/react';
import SwiperCore, {
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination
} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ContinentImage } from '../ContinentImage';
import styles from './styles.module.scss';

type ContinentInfo = {
  id: string,
  name: string,
  imageUrl: string,
  summary: string,
  description: string,
};
interface SliderProps {
  continentsInfo: ContinentInfo[];
}
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);
export const Slider = ({ continentsInfo }: SliderProps) => {
  return (
    <Flex align="center">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        className={styles.swiper}
      >
        {continentsInfo.map(continentInfo => (
          <SwiperSlide key={continentInfo.id}>
            <ContinentImage
              id={continentInfo.id}
              name={continentInfo.name}
              imageUrl={continentInfo.imageUrl}
              description={continentInfo.description}
              summary={continentInfo.summary}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};
