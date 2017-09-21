let webpack=require("webpack");
let HtmlWebpackPlugin=require("html-webpack-plugin");
let WebpackMd5Hash=require("webpack-md5-hash");
let path=require("path");
//开发环境
let isDev=function () {
    return process.env.NODE_ENV === 'development';
};
//生产环境
let isProd=function () {
    return process.env.NODE_ENV === 'production';
};
module.exports={
    entry: "./src/index.js",
    output: {
        filename:"bundle.js",
        path: path.resolve(__dirname,"dist")
    },
    module:{
        rules:[
            {test:/\.js$/, use: "babel-loader",exclude:/node_modules/},
            {test:/\.less$/, use:["style-loader","css-loader","less-loader"]},
            {test:/\.(jpg|png|eot|svg|woff|woff2)$/, use:"url-loader"},
            {test:/\.css$/, use:["style-loader","css-loader"]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ],
    devtool: "source-map",
    devServer: {
        proxy:{
            "/":"http://localhost:3000"
        }
    }
};