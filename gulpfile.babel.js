import gulp from 'gulp'
import rimraf from 'rimraf'
import {
  __Compiling_Server,
  __Watching_src_server,
  __Running_Nodemon,
  __Testing_Server,
  __Running_Tests_and_Serving
} from "./gulp-server-methods.babel"
import { __Building_Client, __Watching_Client } from "./gulp-client-methods.babel"

// SERVER TASKS

gulp.task("server:cleaning", cb => {
  rimraf("./build", () => cb())
})

gulp.task("server:building",
  gulp.series(
    "server:cleaning",
    __Compiling_Server
  )
)

gulp.task(
  "server:watching",
  gulp.series(
    "server:building",
    __Watching_src_server
  )
)

gulp.task(
  "server:dev",
  gulp.series(
    "server:building",
    __Testing_Server,
    gulp.parallel(
      __Watching_src_server,
      __Running_Nodemon
    )
  )
)

gulp.task(
  "server:test",
  gulp.series(
    "server:building",
    __Testing_Server
  )
)

gulp.task(
  "server:test:dev",
  gulp.series(
    "server:building",
    gulp.parallel(
      __Watching_src_server,
      __Running_Tests_and_Serving
    )
  )
)


// CLIENT TASKS
gulp.task("client:clean", cb => {
  rimraf("./public/build", () => cb())
})
gulp.task(
  "client:building",
  gulp.series(
    "client:clean",
    __Building_Client
  )
)
gulp.task(
  "client:dev",
  gulp.series("client:clean", __Watching_Client)
)


// DEV TASKS
gulp.task("dev", gulp.parallel("server:dev", "client:dev"))
gulp.task("build", gulp.parallel("server:building", "client:building"));
