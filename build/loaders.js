const path=require('path');
const resolve=path.resolve;
const isDev= process.env.NODE_ENV;

exports.babel=()=>({
    test:/\.jsx?$/,
    include:[resolve('src'),resolve('utils')],
    use:{
        loader:'babel-loader',
        options:{
            cacheDirectory:isDev?'./.cache/babel':false
        }
    }
});