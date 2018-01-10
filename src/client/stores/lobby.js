
import { Validator } from "../../server/shared/validation"
import { validateMessage } from "../../server/shared/validation/chat"
import { mapOp$ } from "../../server/shared/observable"
import { createView$ } from "../lib/stores"
import * as A from "../actions"

const defaultView = {
  messages: [],
  games: []
}

export default class LobbyStore {
  constructor({dispatcher, socket}, user) {
    this.view$ = createView$(dispatcher, A.VIEW_LOBBY, defaultView)

    dispatcher.onRequest({
      [A.LOBBY_JOIN]: action => socket.emit("action", action),
      [A.LOBBY_SEND_MESSAGE]: action => {
        const validator = new Validator()
        if (!user.isLoggedIn)
          validator.push("You must be logged in.")

        validator.push(validateMessage(action.message))

        if (validator.didFail) {
          dispatcher.fail(action, validator.message)
          return
        }

        socket.emit("action", action)
      }
    })

    this.opSendMessage$ = mapOp$(
      dispatcher.on$(A.LOBBY_SEND_MESSAGE),
      user.details$.map(u => u.isLoggedIn)
    )
  }
}
