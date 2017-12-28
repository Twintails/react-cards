import { mapOp$ } from "../../server/shared/observable"
import * as A from "../actions"

export default class GameStore {
  constructor({dispatcher}, user) {
    const isLoggedIn$ = user.details$.map(d => d.isLoggedIn)

    dispatcher.onRequest({
      [A.GAME_CREATE]: action => {
        dispatcher.succeed(action)
        dispatcher.succeed(A.gameJoin(action.gameId))
      },
      [A.GAME_JOIN]: action => dispatcher.succeed(action)
    })

    this.opCreateGame$ = mapOp$(
      dispatcher.on$(A.GAME_CREATE),
      isLoggedIn$
    )

    this.opJoinGame$ = mapOp$(
      dispatcher.on$(A.GAME_JOIN)
    )
  }
}
