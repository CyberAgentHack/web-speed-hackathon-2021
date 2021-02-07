const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [require('tailwindcss'), cssnano({ preset: ['default', { normalizeUrl: false }] })],
};
