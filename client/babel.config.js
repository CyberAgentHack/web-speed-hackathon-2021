module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: true,
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
