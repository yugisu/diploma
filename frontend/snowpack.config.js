const { compilerOptions } = require("./tsconfig");

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/build" },
  },
  plugins: ["@snowpack/plugin-react-refresh", "@snowpack/plugin-dotenv", "@snowpack/plugin-typescript"],
  alias: Object.keys(compilerOptions.paths)
    .map((pathMapping) => pathMapping.split("/*")[0])
    .reduce((acc, dirName) => ({ ...acc, [dirName]: `./src/${dirName}/` }), {}),
};
