module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true, // 使用旧版装饰器语法
      },
    ],
  ],
};
