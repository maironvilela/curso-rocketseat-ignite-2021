import { InputRightAddon } from "@chakra-ui/core";
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import {
  Flex,
  InputGroup,
  Text,
  Input,
  InputRightElement,
  HStack,
  Avatar,
  SimpleGrid,
  Box,
  theme
} from "@chakra-ui/react";

const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})


export default function Dashboard() {

  const series = [{
    name: 'Arrombamentos',
    data: [1, 10, 3, 8, 5, 12, 13, 22, 6, 0, 5, 15]
  },
  {
    name: 'Atendidos',
    data: [1, 2, 1, 6, 3, 2, 7, 8, 2, 0, 5, 14]
  },
  {
    name: 'Não Atendido',
    data: [1, 8, 2, 2, 2, 10, 6, 14, 4, 0, 0, 1]
  }];


  const options = {

    chart: {
      id: "char",
      // cor dos valores e labels
      foreColor: theme.colors.gray[600],

      toolbar: {
        //desabilita a barra de ferramenta
        show: false,
      },
      zoom: {
        //desabilita o zoon
        enabled: false,
      },
    },
    /*
    colors: [
      theme.colors.red[800],
      theme.colors.green[900],
      theme.colors.orange[900],
    ],*/
    dataLabels: {
      enabled: false,
    },

    grid: {
      show: true,
      borderColor: theme.colors.gray[900],
      row: {
        opacity: 0.5
      }
    },
    // Labels das referencias ddos valores
    xaxis: {
      categories: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },

    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: "vertical",
        opacityFrom: 0.5,
        opacityTo: 0.3,
      },
    },
    legend: {
      show: true,
    }
  }


  return (
    <>
      <Head>
        <title> dashgo | Dashboard</title>
      </Head>

       <Flex h="100vh" flexDirection="column" >
        <Header />

        <Flex maxWidth={1480} mx="auto" w='90vw' >

          <Sidebar />

          <SimpleGrid minChildWidth="320px" flex="1" gap="4" mt="8">

            <Box bg="gray.800" minHeight="300" >
              <Text p="15"> Arrombamentos </Text>
              <ApexCharts
                options={options}
                series={series}
                type="area"
                height={250}
              />


            </Box>
            <Box bg="gray.800" minHeight="300">
              <Text p="15">  Taxa de Abertura </Text>
              <ApexCharts
                options={options}
                series={series}
                type="area"
                height={250}
              />


            </Box>
          </SimpleGrid>


        </Flex>

      </Flex >
    </>
  )

}
