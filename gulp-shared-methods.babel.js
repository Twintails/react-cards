import browserSync, { create as createBS, init as initBS } from 'browser-sync'

export function __Compile_Error(e) {
  console.log("\x1b[41m \x1b[37m Compile ERROR:\x1b[0m \x1b[31m", e.name, "\n\x1b[0m", e.message)
  this.emit('end')
}

export function __createBS() {
  initBS()
}
