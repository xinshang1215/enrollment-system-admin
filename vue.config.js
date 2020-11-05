module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: "http://localhost:3000/ma",
                ws: false,
                changeOrigin: true
            }
        }
    }
}