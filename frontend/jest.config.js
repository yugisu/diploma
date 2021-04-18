const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|js)x?$': 'ts-jest',
  },

  clearMocks: true,

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  moduleNameMapper: Object.keys(compilerOptions.paths)
    .map((pathMapping) => pathMapping.split('/*')[0])
    .reduce((acc, dirName) => ({ ...acc, [`^${dirName}/(.*)$`]: `<rootDir>/src/${dirName}/$1` }), {}),
}
