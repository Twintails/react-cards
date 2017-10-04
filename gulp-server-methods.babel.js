import gulp from 'gulp'
import path from 'path'
import { __Compile_Error, __createBS } from './gulp-shared-methods.babel'
import child_process from "child_process"
import webpack from 'webpack'
import webpackConfig from './webpack.config'


const $g = require("gulp-load-plugins")()



export function __Compiling_Server() {
  return gulp.src("./src/server/**/*.js")
    .pipe($g.changed("./build"))
    .pipe($g.sourcemaps.init())
    .pipe($g.babel().on("error", __Compile_Error))
    .pipe($g.sourcemaps.write(".", { sourceRoot: path.join(__dirname, "src", "server")}))
    .pipe(gulp.dest("./build").on('start', __createBS).on("error", __Compile_Error))
}

export function __Watching_src_server() {
  return gulp
    .watch("./src/server/**/*.js", gulp.series(__Compiling_Server))
    .on("error", __Compile_Error)
}

export function __Running_Nodemon() {
  return $g.nodemon({
    script: "./server.js",
    watch: ["views", "build"],
    ignore: ["**/tests"],
    exec: "node --inspect"
  }).once('quit', () => process.exit())
}

export function __Testing_Server(cb) {
  child_process.exec("node ./tests.js", (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    if (err) {
      cb(new $g.util.PluginError("__Testing_Server", "Tests Failed"))
    } else {
      cb()
    }

  })
}

export function __Running_Tests_and_Serving() {
  return $g.nodemon({
    script: "./tests.js",
    watch: ["views", "build"]
  }).on('start', __createBS).once('quit', () => process.exit())
}
