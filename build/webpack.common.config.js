const path= require('path');
const loaders=require('./loaders');

module.exports={
    resolve:{
        modules:['node_modules'],
        extensions:['.js','.jsx','.less','css'],
        alias:{}
    },
    resolveLoader:{
        modules:['node_modules']
    },
    module:{
        rules:[
            loaders.babel(),
        ]
    },
    externals:{}
}