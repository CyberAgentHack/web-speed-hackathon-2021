const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
    postcssPresetEnv({
      stage: 3,
    }),
  ],
};
