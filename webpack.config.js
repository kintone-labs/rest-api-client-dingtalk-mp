const path = require('path');

module.exports = (env, argv) => ({
  entry: './src/KintoneRestAPIClientDingTalkMP.js',
  output: {
    filename: 'kintone-rest-api-client-dingtalk-mp.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  devtool: argv.mode === 'development' ? 'inline-cheap-source-map' : ''
});
