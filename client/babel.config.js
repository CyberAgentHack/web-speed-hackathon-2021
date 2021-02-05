module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'commonjs',
        useBuiltIns: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: true,
      },
    ],
  ],
};
