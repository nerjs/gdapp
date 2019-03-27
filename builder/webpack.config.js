const path = require('path');
const webpack = require('webpack');
const DotEnv = require('dotenv-webpack');
const { cleanDir } = require('./util_dirs')
const copyAbi = require('./copy_abi')


const {
    NODE_ENV='development',
    SERVER_SIDE=false
} = process.env



const config = {
    mode: NODE_ENV == 'production' ? 'production' : 'development',
    entry: { 
        main: path.join(__dirname, '..', 'app', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, '..','server','files','js'),
        filename: 'main.js',
        chunkFilename: '[name].chunk.[hash].js',
        publicPath: '/js/'
    },
    devtool: NODE_ENV == 'production' ? false : 'cheap-eval-source-map',
    performance: {
		maxEntrypointSize:1000000,
        maxAssetSize: 1000000
	},
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options : {
                presets : [
                    '@babel/preset-env', 
                    '@babel/preset-react'
                ],
                plugins : [
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-class-properties',
                    // ["transform-object-rest-spread", { "useBuiltIns": true }],
                    // 'transform-runtime',,
                ]
            }
          }
        }
      ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new DotEnv(),
    ],
    resolve: {
        alias: {
            icons : 'react-icons/lib',
            build: path.join(__dirname, '..', 'build'),
            data: path.join(__dirname, '..', 'app', 'data'),
            routes: path.join(__dirname, '..', 'app', 'routes'),
            styled: path.join(__dirname, '..', 'app', 'styled')
        }
    },
    watch: NODE_ENV != 'production'
  }


if (NODE_ENV != 'production') {
    config.module.rules[0].use.options.plugins.push([
        'babel-plugin-styled-components',{
            displayName: true,
            fileName: true
        }])
}

if (NODE_ENV == 'hot') {
    config.entry.main = [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        // 'fetch-polyfill', 
        path.join(__dirname, '..', 'app', 'hot.js')
    ]
    config.plugins.push(new webpack.HotModuleReplacementPlugin()) 
    config.module.rules[0].use.options.plugins.push('react-hot-loader/babel')
    
}

if (!SERVER_SIDE) {
    cleanDir(config.output.path)
    copyAbi(path.join(__dirname, '..', 'build', 'contracts'), path.join(__dirname, '..', 'build', 'abi'))
}

module.exports = config
