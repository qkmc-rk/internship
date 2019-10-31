
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './index.js',                    //入口js文件即可
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        filename: "bundle.js"               //输出js名称
    },
    module: {
        rules: []
    }
}
