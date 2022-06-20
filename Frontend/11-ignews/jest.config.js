/* eslint-disable no-undef */
module.exports = {
  // Pastas que serão ignoradas para os testes
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  // Lista de arquivos que deve ser executado antes dos testes
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  // Converte os arquivos antes dos testes para que o Jest entendam-os
  transform: {
    '^.*\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
  },
  // Indica o ambiente em que os testes estão sendo executado
  // Cria uma representação da DOM em javascript para identificar o que foi renderizado
  testEnvironment:
    'jsdom' /*Indica se as informações de cobertura devem ser coletadas durante a execução do teste*/,

  //conjunto de arquivos para os quais as informações de cobertura devem ser coletadas
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
    'src/_app.tsx',
    'src/_document.tsx',
  ],
  coverageReporters: ['json', 'lcov'],
  //Indica se as informações de cobertura devem ser coletadas durante a execução do teste
  collectCoverage: true,
};
