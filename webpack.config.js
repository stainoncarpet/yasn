const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { webpack } = require('webpack');

module.exports = () => {
  const isProduction = process.env === "production" ? "production" : "development"

  return {
    entry: './src/client/index.js',
    mode: isProduction,
    output: {
      path: path.resolve(__dirname, "src", "server", 'public'),
      publicPath: process.env.ASSET_PATH || '/',
      filename: 'index.js'
    },
    module: {
      rules: [{
        test: /\.t|jsx?$/i,
        use: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name][hash].[ext]',
              outputPath: 'images',
              esModule: false,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src', 'client', 'index.html'),
        inject: "body",
        chunks: "all",
        favicon: path.resolve(__dirname, 'src', 'client', 'favicon.ico'),
      }),
      new CleanWebpackPlugin({dangerouslyAllowCleanPatternsOutsideProject: true})
    ],
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
    }
  }
};