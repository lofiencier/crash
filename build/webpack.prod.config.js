const webpack=require('webpack');
const merge=require('webpack-merge');
const path=require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin= require('terser-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const BundleAnalyzePlugin= require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DotEnv= require('dotenv-webpack');
let commonConfig = require("./webpack.common.config");


const webpackProdConfig={
    mode:'production',
    devtool:'none',
    entry:{
        app:[path.resolve(__dirname,'../src/app.js')]
    },
    output:{
        path:path.resolve(__dirname,'../public'),
        publicPath:'/',
        filename:'js/[name]-[hash:8].js',
        chunkFilename:'js/[name]-[hash:8].js'
    },
    optimization:{
        minimizer:[
            new TerserWebpackPlugin({
                cache:'./.cache/terser', //缓存
                parallel:true,//多线程
                sourceMap:false,
                terserOptions: {
                  warnings: false,
                  compress: {
                    unused: true,
                    dead_code:true,
                    drop_console: true,
                    drop_debugger: true,
                  },
                  output: {
                    ecma:5,
                    comments: false, //不保留注释
                    beautify: false, //不需要格式化
                  },
                },
              }),
              new OptimizeCssAssetsPlugin({
                  assetNameRegExp:/(\.m)?\.(css|less)$/,
                  cssProcessorOptions:{
                      safe:true,
                      mergeLonghand:false,
                      discardComments:{
                          removeAll:true
                      }
                  },
                  canPrint:true
              })
        ],
        runtimeChunk:{
           name:entryPoint=>`runtime~${entryPoint.name}`
        },
        splitChunks:{
            chunks:'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups:{
                vendors:{
                    name:'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks:'initial',
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                commons:{
                    name:'styles',
                    chunks:'all',
                    minChunks:1,
                    reuseExistingChunk:true,
                    enforce:true,
                    test: /(\.m)?\.(css|less)$/g
                }
            }
        }
    },
    
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            title:'crash',
            inject:true,
            hash:true,
            cache:true,
            template:'./build/static/template.html',
            // favicon:'./build/static/favicon.ico'
        }),
        // new DotEnv({
        //     path: path.resolve(`./build/env/.env.${env}`),
        //     safe: false,
        //     systemvars: false
        // }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename:'[id].css'
        }),
        new BundleAnalyzePlugin({
            openAnalyzer:true,
            analyzerMode: "static",
            analyzerPort:8001,
        })
    ]
}

module.exports=merge(commonConfig,webpackProdConfig);