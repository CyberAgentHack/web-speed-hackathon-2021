const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const calc = require('postcss-calc');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
    customProperties({ preserve: false }),
    postcssPresetEnv({
      stage: 3,
    }),
  ],
  // map: true,
  map: false,

};

calc();
cssnano();