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
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],

  exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.spec.tsx'],

  plugins: [
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'graphql-codegen',
        watch: 'graphql-codegen --watch',
        name: 'graphql-codegen',
      },
    ],
  ],
  alias: {
    ...importAliasesFromTsconfig,
    // Map `shared` lib to be directly handled by the Snowpack
    '@diploma/shared': '../shared/src',
  },
  packageOptions: {
    knownEntrypoints: ['zod', 'ts-invariant', 'symbol-observable'],
  },
  devOptions: {
    open: 'none',
  },
}
