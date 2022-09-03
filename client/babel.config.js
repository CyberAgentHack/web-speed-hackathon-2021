module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'commonjs',
        // https://zenn.dev/sa2knight/articles/67f6f5cc4ed5e26e391c
        useBuiltIns: "usage",
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV === 'development',
      },
    ],
  ],  
};
