module.exports = {
    devServer: {
        port: 8083,
        hot: true,
        noInfo: false,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '^/api': {
                target: 'F',
                pathRewrite: {
                    '^/api': ''
                },
                ws: true,
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}