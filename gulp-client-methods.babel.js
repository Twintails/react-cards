import webpack from 'webpack'
import webpackConfig from './webpack.config'

const consoleStats = {
  colors: true,
  exclude: ["node_modules"],
  chunks: false,
  assets: false,
  timings: true,
  modules: false,
  hash: false,
  version: false
}

export function __Building_Client (cb) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      cb(err)
      return
    }
    console.log(stats.toString(consoleStats))
    cb()
  })
}

export function __Watching_Client () {

  const WebpackDevServer = require("webpack-dev-server")
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, {
    publicPath: '/build/',
    hot: true,
    stats: consoleStats,
    headers: { "Access-Control-Allow-Origin": "*" }
  })
  server.listen(8080, () => {})
}
