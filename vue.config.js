'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '人力资源管理平台' // 网页标题

// 如果端口设置为80，
// 使用管理员权限执行命令行。
// 例如, Mac: sudo npm run
// 您可以通过以下方法修改端口:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

//所有的配置项说明可以在https://cli.vuejs.org/config/中找到
module.exports = {
  /**
   * 如果您计划将站点部署到子路径下，例如GitHub Pages，则需要设置publicPath。
   * 如果您计划将站点部署到https://foo.github.io/bar/，
   * 那么应该将publicPath设置为“/bar/”。
   * 在大多数情况下请使用'/' !!
   * 细节:https://cli.vuejs.org/config/ 公共路径
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理跨域的配置
    proxy: {
      // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
      '/api': {
        // target: 'http://ihrm-java.itheima.net/', // 跨域请求的地址

        target: 'http://ihrm.itheima.net/', // 备用接口地址
        changeOrigin: true // 只有这个值为true的情况下 才表示开启跨域
      }
    }
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用程序的标题，这样
    // 它可以在index.html中访问，以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 它可以提高第一屏的速度，建议打开预载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面很多的时候，它会引起太多无意义的请求
    config.plugins.delete('prefetch')

    // 设置svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' //只打包最初依赖的第三方
              },
              elementUI: {
                name: 'chunk-elementUI', // 将elementUI拆分为单个包
                priority: 20, // 权重需要大于libs和app，否则它将被打包到libs或app中
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // 可以自定义规则
                minChunks: 3, //   最低限度共同氧化数
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })

          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
