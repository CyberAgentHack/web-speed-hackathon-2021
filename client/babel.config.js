module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: false,
        modules: 'commonjs',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: false,
      },
    ],
  ],
};
