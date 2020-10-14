module.exports = {
  publicPath: '/shouqing',
  devServer: {
    proxy: {
      '/api2': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/ajax': {
        target: 'http://m.maoyan.com',
        // ws: true,
        changeOrigin: true
      }
      // '/foo': {
      //     target: '<other_url>'
      // }
    }
  }
}
