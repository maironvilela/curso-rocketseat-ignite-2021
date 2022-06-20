import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { makeServer } from '../services/mirage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { theme } from '../styles/theme';

import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  if (process.env.NODE_ENV === 'development') {
    makeServer();
  }
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
