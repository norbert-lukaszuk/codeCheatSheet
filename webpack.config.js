const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  mode: "development",
  // mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 5000
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: 'src/index.html',
    title: 'Calendar addon'
  }),
  
  
],
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['prismjs']
        }
      }
    },
    {
      test: /\.scss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }
  ]
}
}