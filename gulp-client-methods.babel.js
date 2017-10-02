// import gulp from 'gulp'
// import path from 'path'
// import { __Compile_Error, __createBS } from './gulp-shared-methods.babel'
// import child_process from "child_process"
import webpack from 'webpack'
import webpackConfig from './webpack.config'

// const $g = require("gulp-load-plugins")()

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

export function __BuildingClient (cb) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      cb(err)
      return
    }
    console.log(stats.toString(consoleStats))
    cb()
  })
}
