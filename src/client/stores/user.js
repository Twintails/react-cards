import { validateName } from "../../server/shared/validation/user"
import { mapOp$ } from "../../server/shared/observable"
import * as A from "../actions"

const defaultDetails = {
  isLoggedIn: false,
  id: null,
  name: null
}

export default class UserStore {
  constructor({dispatcher, socket}) {
    this.details$ = dispatcher.on$(A.USER_DETAILS_SET)
      .map(a => a.details)
      .startWith(defaultDetails)
      .publishReplay(1)

    this.details$.connect()

    this.details$.subscribe(details =>
      Object.keys(details).forEach(k => this[k] = details[k]))

    this.opLogin$ = mapOp$( dispatcher.on$(A.USER_LOGIN), this.details$.map(details => !details.isLoggedIn))

    dispatcher.onRequest({
      [A.USER_LOGIN]: (action) => {
        const validator = validateName(action.name)
        if (validator.didFail) {
          dispatcher.fail(action, validator.message)
          return
        }

        socket.emit("action", action)
      }
    })
  }
}
