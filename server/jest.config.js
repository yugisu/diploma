module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },

  clearMocks: true,

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  modulePathIgnorePatterns: ['<rootDir>/build/'],
}
