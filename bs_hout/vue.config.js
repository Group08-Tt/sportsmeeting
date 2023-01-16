module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/bs': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '/bs': '/bs'
                }
            }
        }
    }
};
