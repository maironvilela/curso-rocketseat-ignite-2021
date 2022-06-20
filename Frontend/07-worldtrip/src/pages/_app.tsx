import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Header } from '~/components/Header';
import '../styles/global.scss';




function MyApp({ Component, pageProps }: AppProps) {
/*   if(process.env.NODE_ENV === 'development' ){
    makeServer();
  } */

  return (
    <ChakraProvider>
      <header>
        <Header />
      </header>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
