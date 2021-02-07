module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: "usage",
        modules: 'commonjs',
      },
    ],
    [
      '@babel/preset-react',
      {
      },
    ],
  ],
};
