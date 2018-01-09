import * as A from "../actions"
import { Dispatcher } from "../shared/dispatcher"

import { validateName } from "../shared/validation/user"

export class Client extends Dispatcher {
  get details() {
    return {
      id: this.id,
      isLoggedIn: this.isLoggedIn,
      name: this.name
    }
  }

  constructor(socket, app) {
    super()
    this.id = socket.id
    this.isLoggedIn = false
    this.name = null
    this.app = app

    this._socket = socket
    this._onDisposes = []

    this._onDisposes.push(app.addClient(this))
    this.emit(A.userDetailsSet(this.details))

    socket.on("action", action => super.emit(action))
    socket.on("disconnect", () => this.dispose())

    this._installHandlers()
  }

  emit(action) {
    this._socket.emit("action", action)
  }

  login(name) {
    const validator = validateName(name)
    if (validator.didFail)
      return validator

    this.isLoggedIn = true
    this.name = name
    this.emit(A.userDetailsSet(this.details))

    return validator
  }

  dispose() {
    this._onDisposes.forEach(a => a())
    this.onDisposes = []
  }

  _installHandlers(){
    this.onRequest({
      [A.USER_LOGIN]: (action) => {
        const validator = this.login(action.name)
        this.respond(action, validator)
      }
    })

  }
}
