const path = require('path')

const { compilerOptions } = require('./tsconfig')

const importAliasesFromTsconfig = Object.keys(compilerOptions.paths)
  .map((pathMapping) => pathMapping.split('/*')[0])
  .reduce((acc, dirName) => ({ ...acc, [dirName]: path.join(__dirname, `./src/${dirName}/`) }), {})

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: path.join(__dirname, '../'),
  mount: {
    public: { url: '/', static: true },
    src: { url: '/build' },
  },
  plugins: ['@snowpack/plugin-typescript', '@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv'],
  alias: {
    ...importAliasesFromTsconfig,
    // Map `shared` lib to be directly handled by the Snowpack
    '@diploma/shared': '../shared/src',
  },
  buildOptions: {
    sourcemap: true,
  },
}
