import gulp from 'gulp'
import rimraf from 'rimraf'
import {
  __Compiling_Server,
  __Watching_src_server,
  __Running_Nodemon,
  __Testing_Server,
  __Running_Tests_and_Serving
} from "./gulp-server-methods.babel"
import { __BuildingClient } from "./gulp-client-methods.babel"

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

gulp.task("client:build", __BuildingClient)
