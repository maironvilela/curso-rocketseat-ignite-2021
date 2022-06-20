/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-nested-ternary */
import { Button, Flex, Image } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CardList } from '../components/CardList';
import { Error as ErrorComponent } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

type Image = {
  description: string;
  id: string;
  title: string;
  ts: number;
  url: string;
};

export default function Home(): JSX.Element {
  // const ref: any = useRef<HTMLDivElement>();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetchImages = async ({ pageParam = 1 }) => {
    try {
      const response = await api.get(`api/images`, {
        params: {
          after: pageParam,
        },
      });
      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };
  const { data, isLoading, hasNextPage, fetchNextPage, isFetching, error } =
    useInfiniteQuery('images', fetchImages, {
      getNextPageParam: lastPage => {
        return lastPage.after;
      },
    });

  const formattedData = useMemo(() => {
    console.log('DATA: ', data);
    const formattedDataResult = data?.pages.reduce<Image[]>(
      (list, page) => list.concat(page.data),
      []
    );
    return formattedDataResult;
  }, [data]);

  /*
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '0px');

  useEffect(() => {
    if (onScreen && !isLoading && !error) {
      fetchNextPage();
    }
  }, [onScreen, isLoading, error, fetchNextPage]);
 */
  return (
    <Flex justify="center" w="100vw" align="center">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <Flex justify="center" w="100vw" align="center" flexDir="column">
          <Header />
          <Flex px={12} py={12}>
            <CardList cards={formattedData} />
          </Flex>
          {isFetching ? (
            <Loading />
          ) : (
            hasNextPage && (
              <Button onClick={() => fetchNextPage()}>Carregar mais</Button>
            )
          )}
        </Flex>
      )}

      {/**
      <div
        ref={ref}
        style={{
          width: '100%',
          height: '100px',
          backgroundColor: '#353431',
        }}
      /> */}
    </Flex>
  );
}
