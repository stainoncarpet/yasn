const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
  const isProduction = process.env === "production" ? "production" : "development";
  const PASSWORD_RESET_ACTION_LIFESPAN = 90;

  return {
    entry: './src/client/index.tsx',
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
      new CleanWebpackPlugin({ dangerouslyAllowCleanPatternsOutsideProject: true }),
      new webpack.DefinePlugin({"PASSWORD_RESET_ACTION_LIFESPAN": JSON.stringify(PASSWORD_RESET_ACTION_LIFESPAN)}),
      new webpack.DefinePlugin({"APP_ADDRESS": JSON.stringify("http://localhost:3000")})
    ],
    devServer: {
      compress: true,
      proxy: {
        "/socket.io": { "ws": true, "target": "ws://localhost:3000" }
      },
      historyApiFallback: true
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
    }
  }
};