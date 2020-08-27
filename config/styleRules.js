const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDEV = process.env.NODE_ENV === 'development';

const devCssLoader = ['style-loader', 'css-loader', 'postcss-loader'];
const lessLoader = [
  'css-loader',
  'postcss-loader',
  {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
    },
  },
  {
    loader: 'style-resources-loader',
    options: {
      patterns: path.resolve(__dirname, 'src/styles/theme.less'),
      injector: 'append',
    },
  },
];
const devLessLoader = ['style-loader'].concat(lessLoader);

// MiniCssExtractPlugin.loader 压缩CSS
const prodCssloader = [MiniCssExtractPlugin.loader].concat(devCssLoader);
const prodLessLoader = [MiniCssExtractPlugin.loader].concat(lessLoader);

const rules = [
  {
    test: /\.css$/,
    use: isDEV ? devCssLoader : prodCssloader,
  },
  {
    test: /\.less$/,
    use: isDEV ? devLessLoader : prodLessLoader,
  },
];

module.exports = rules;
