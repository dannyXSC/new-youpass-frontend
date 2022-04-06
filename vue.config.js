const webpack = require("webpack");
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.$": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    },
    lintOnSave: false,	//关闭校验
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5050',	//代理目标的基础路径
                // changeOrigin: true,
            }
        }
    },
    runtimeCompiler: true,
    productionSourceMap: false,

    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/'
}