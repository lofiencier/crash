const webpack=require('webpack');
const merge=require('webpack-merge');
const path=require('path');
const DotEnv= require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
let commonConfig = require("./webpack.common.config");

const env=process.env.NODE_ENV;

const webpackDevConfig={
    mode:'development',
    devtool:'source-map',
    entry:{
        app:[path.resolve(__dirname,'../src/app.js')]
    },
    output:{
        path:path.resolve(__dirname,'../public'),
        publicPath:'/',
        filename:'js/[name].js',
        chunkFilename:'js/[name]~[hash:8].js'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
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
        // })
    ],
    devServer: {
        compress: true,
        port: 8000,
        historyApiFallback: true,
        disableHostCheck: true,
        open: true
    }
}
console.log('webpackDevConfig :', webpackDevConfig);
module.exports=merge(commonConfig,webpackDevConfig);