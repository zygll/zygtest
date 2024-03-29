console.log('打包环境222：', process.env.NODE_ENV)
console.log('当前服务器地址：', process.env.VUE_APP_BASE_URL)

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
    devServer: {
      port: 3001,
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    configureWebpack: {
      optimization: {
        splitChunks: {
          chunks: 'all', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
          minSize: 30000, // 最小尺寸，30000
          maxSize: 50000,  // 
          minChunks: 1, // ：指定一个模块被多少个chunk同时引用时，才进行代码分割。默认值为1。
          maxAsyncRequests: 5, //指定同时加载的异步请求的最大数量。默认值为5。
          maxInitialRequests: 3,//指定入口点的最大并行请求数量。默认值为3。
          automaticNameDelimiter: '-', // 指定生成的拆分包名称之间的连接符。默认值为~。
          cacheGroups: { // ：指定缓存组的配置，用于控制拆分包的归类规则。可以自定义命名规则以及优先级。
            // vendors: {
            //   test: /[\\/]node_modules[\\/]/,
            //   priority: -10
            // },
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: -10,  // 
              chunks: 'initial' // only package third parties that are initially dependent
            },
            elementUI: {
              name: 'chunk-elementUI', // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
            },
          }
        }
      }
    }
  };
  