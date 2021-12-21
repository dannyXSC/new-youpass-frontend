module.exports = {
    lintOnSave: false,	//关闭校验
    devServer: {
        proxy: {
            '/*': {
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