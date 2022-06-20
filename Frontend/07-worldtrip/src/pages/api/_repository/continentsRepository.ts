import faker from 'faker';

export function getCities(quantity: number) {
  const cities = [];
  for (let i = 1; i <= quantity; i++) {
    cities.push({
      id: faker.datatype.uuid(),
      name: faker.address.cityName(),
      imageUrl: `http://placeimg.com/1024/${Math.floor(
        Math.random() * (700 - 500) + 500,
      )}/nature`,
      country: {
        name: faker.address.country(),
        flag: faker.address.countryCode().toLocaleLowerCase(),
      },
    });
  }

  return cities;
}

export const continents = [
  {
    id: '1',
    name: 'Europa',
    imageUrl:
      'https://images.unsplash.com/photo-1568547733782-446ab75af12a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    summary: 'O continente mais antigo.',
    description:
      'A Europa é, por convenção, um dos seis continentes do mundo. Compreendendo a península ocidental da Eurásia, a Europa geralmente divide-se da Ásia a leste pela divisória de águas dos montes Urais, o rio Ural, o mar Cáspio, o Cáucaso,[1] e o mar Negro a sudeste.[2] A Europa é limitada pelo oceano Glacial Ártico e outros corpos de água no norte, pelo oceano Atlântico a oeste, pelo mar Mediterrâneo ao sul, e pelo mar Negro e por vias navegáveis interligadas ao sudeste. No entanto, as fronteiras para a Europa, um conceito que remonta à Antiguidade clássica, são um tanto arbitrárias, visto que o termo Europa pode referir-se a uma distinção cultural e política ou geográfica.',
    created_at: new Date(),
    numberOfCountries: faker.datatype.number(300),
    numberOfLanguages: faker.datatype.number(60),
    numberOfCities: faker.datatype.number(300),
    cities: getCities(10),
  },
  {
    id: '2',
    name: 'Asia',
    imageUrl:
      'https://images.unsplash.com/photo-1610238115511-81be15284155?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
    summary: 'O Pais mais populoso do mundo.',
    description: `A Ásia é o maior continente em área terrestre do mundo, estando boa parte
    do continente localizado no Hemisfério Norte. Além de ser o mais extenso, é
    também o mais populoso, habitando nele cerca de três quintos da
    população mundial. A Ásia é multicultural, abrigando diversas culturas,
     etnias, religiões e tradições.
    Geograficamente, o continente asiático é também muito diverso.
    No continente, localiza-se algumas montanhas que estão entre as mais altas do mundo,
     grandes desertos e extensos rios. O povo asiático corresponde a uma das
     civilizações mais antigas do mundo, iniciada há cerca de 4000 anos`,
    created_at: new Date(),
    numberOfCountries: faker.datatype.number(300),
    numberOfLanguages: faker.datatype.number(60),
    numberOfCities: faker.datatype.number(300),
    cities: getCities(10),
  },
  {
    id: '3',
    name: 'America',
    imageUrl:
      'https://images.unsplash.com/photo-1526638684360-95cdcee762ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80',
    summary: `conhecida pela expressão "Novo Mundo" `,
    description: `As terras compostas pelo continente americano são consideradas geologicamente antigas, apresentando composições que foram muito transformadas pelos agentes externos ou exógenos de transformação do relevo. No entanto, há também algumas formas de relevo mais recentes, geralmente posicionadas em toda a sua porção oeste banhada pelo Pacífico, como as cadeias de montanhas formadas pela Cordilheira dos Andes e pelas Montanhas Rochosas, ambas as composições formadas pelas ações do tectonismo.
    Na porção leste, o relevo mais acidentado propicia uma maior predominância de planícies (como a do Amazonas, no sul, e do Mississipi, ao Norte) e de planaltos (como o Planalto do Labrador e o Planalto Central). Tais composições evidenciam as pluralidades naturais existentes na geomorfologia americana.`,
    created_at: new Date(),
    numberOfCountries: faker.datatype.number(300),
    numberOfLanguages: faker.datatype.number(60),
    numberOfCities: faker.datatype.number(300),
    cities: getCities(10),
  },
  {
    id: '4',
    name: 'Oceania',
    imageUrl:
      'https://images.unsplash.com/photo-1566953483968-d3937956938e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=367&q=80',
    summary: 'As mais lindas Ilhas do mundo',
    description: `composta por vários grupos de ilhas do oceano Pacífico (Polinésia, Melanésia e Micronésia). O termo Oceania foi criado em 1831 pelo explorador francês Dumont d'Urville. O termo é usado hoje em vários idiomas para designar uma região geográfica e política que compreende o continente da Austrália e ilhas do Oceano Pacífico adjacentes.`,
    created_at: new Date(),
    numberOfCountries: faker.datatype.number(300),
    numberOfLanguages: faker.datatype.number(60),
    numberOfCities: faker.datatype.number(300),
    cities: getCities(10),
  },
  {
    id: '5',
    name: 'Africa',
    imageUrl:
      'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80',
    summary: 'Pluralidade Étnica e Cultural',
    description: `A África é um continente localizado na zona intertropical, com maior parte do seu território no Hemisfério Sul. Possui mais de um bilhão de habitantes e 30 milhões de km2 de extensão, sendo, por isso, considerado um dos maiores e mais populosos continentes do mundo. Possui uma grande diversidade étnica, reunindo centenas de grupos que são falantes de dezenas de idiomas distintos.`,
    created_at: new Date(),
    numberOfCountries: faker.datatype.number(300),
    numberOfLanguages: faker.datatype.number(60),
    numberOfCities: faker.datatype.number(300),
    cities: getCities(10),
  },
  {
    id: '6',
    name: 'Antártida',
    imageUrl:
      'https://media.istockphoto.com/photos/weather-eroded-iceberg-in-wilhemina-bay-antarctica-picture-id996101302?b=1&k=20&m=996101302&s=170667a&w=0&h=FUxOab2LPf4qZe6aTV3Gk7pkhTDxUlgZlLQelBW2v1g=',
    summary: 'Lugar mais frio do mundo',
    description: `Antártida ou Antártica (ver questão do nome) é o mais meridional e o segundo menor dos continentes (maior apenas que a Austrália), com uma superfície de 14 milhões de quilômetros quadrados. Rodeia o polo Sul, e por esse motivo está quase completamente coberta por enormes geleiras (glaciares), exceção feita a algumas zonas de elevado aclive nas cadeias montanhosas e à extremidade norte da península Antártica. Sua formação se deu pela separação do antigo supercontinente Gondwana há aproximadamente 100 milhões de anos e seu resfriamento aconteceu nos últimos 35 milhões de anos.`,
    created_at: new Date(),
    numberOfCountries: faker.datatype.number(300),
    numberOfLanguages: faker.datatype.number(60),
    numberOfCities: faker.datatype.number(300),
    cities: getCities(10),
  },
];
