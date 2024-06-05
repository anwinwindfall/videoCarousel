const CopyWebpackPlugin = require('copy-webpack-plugin');
const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
var webpack = require('webpack');
const fs = require('fs');


// Determine the appropriate .env file based on the environment
const envPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);
const fallbackEnvPath = path.resolve(__dirname, '.env');
const envFilePath = fs.existsSync(envPath) ? envPath : fallbackEnvPath;

// Read and parse the .env file manually
const envFileContent = fs.readFileSync(envFilePath, 'utf8');
const envVariables = envFileContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    acc[key.trim()] = value.trim();
  }
  return acc;
}, {});

// Set environment variables for EnvironmentPlugin
const envKeys = Object.keys(envVariables).reduce((prev, next) => {
  prev[next] = envVariables[next];
  return prev;
}, {});

// Add NODE_ENV
const isDevelopment = process.env.NODE_ENV !== 'production';
envKeys['process.env.NODE_ENV'] = JSON.stringify(isDevelopment ? 'development' : 'production');


const hubspotConfig = ({ portal, autoupload } = {}) => {
  return {
    target: 'web',
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false } },
            {
              loader: 'postcss-loader',
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'url-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HubSpotAutoUploadPlugin({
        portal,
        autoupload,
        src: 'dist',
        dest: 'Video Carousel V1',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/images', to: 'images' },
          {
            from: 'src/modules',
            to: 'modules',
          },
        ],
      }),
      new webpack.EnvironmentPlugin(envKeys),
    ],
  };
};

module.exports = [hubspotConfig];
