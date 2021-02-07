const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const cssnano = require("cssnano");
const { css } = require('jquery');

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
    cssnano(),
    postcssPresetEnv({
      stage: 3,
    }),
  ],
  map: true,
};
