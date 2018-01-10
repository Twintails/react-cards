import _ from "lodash"
import { Observable } from "rxjs"
import { Validator } from "../../server/shared/validation"
import { validateMessage } from "../../server/shared/validation/chat"
import { mapOp$ } from "../../server/shared/observable"
import * as A from "../actions"
import { createView$ } from "../lib/stores"

const defaultView  = {
  id: null,
  title: null,
  step: A.STEP_DISPOSED,
  options: {},
  players: [],
  messages: [],
  round: null,
  timer: null
}

const defaultPlayerView = {
  id: null,
  hand: [],
  stack: null
}

export default class GameStore {
  constructor({dispatcher, socket}, user) {
    this.view$ = createView$(dispatcher, A.VIEW_GAME, defaultView)
    this.player$ = createView$(dispatcher, A.VIEW_PLAYER, defaultPlayerView)

    const passThroughAction = action => socket.emit("action", action)
    const isLoggedIn$ = user.details$.map(d => d.isLoggedIn)
    const playerAndGame$ = Observable.combineLatest(this.view$, this.player$)

    dispatcher.onRequest({
      [A.GAME_CREATE]:       action => {
        dispatcher.succeed(action)
        dispatcher.succeed(A.gameJoin(action.gameId))
      },
      [A.GAME_JOIN]:         passThroughAction,
      [A.GAME_SET_OPTIONS]:  passThroughAction,
      [A.GAME_START]:        passThroughAction,
      [A.GAME_SELECT_CARD]:  passThroughAction,
      [A.GAME_SELECT_STACK]: passThroughAction,
      [A.GAME_SEND_MESSAGE]: action => {
        const validator = new Validator()
        if (!user.isLoggedIn)
          validator.push("You must be logged in.")

        validator.push(validateMessage(action.message))

        if (validator.didFail) {
          dispatcher.fail(action, validator.message)
          return
        }

        // TODO: Send to Socket
        socket.emit("action", action)
      }
    })



    this.opCreateGame$ = mapOp$(
      dispatcher.on$(A.GAME_CREATE),
      isLoggedIn$
    )

    this.opJoinGame$ = mapOp$(
      dispatcher.on$(A.GAME_JOIN)
    )

    this.opSetOptions$ = mapOp$(
      dispatcher.on$(A.GAME_SET_OPTIONS),
      isLoggedIn$ // TODO: && Player ID is the same as Owner ID (setup owner ID on game)
    )

    this.opStart$ = mapOp$(
      dispatcher.on$(A.GAME_START),
      isLoggedIn$ // TODO: && Player ID is owner ID or isCzar
    )

    this.opSendMessage$ = mapOp$(
      dispatcher.on$(A.GAME_SEND_MESSAGE),
      isLoggedIn$
    )

    this.opSelectCard$ = mapOp$(
      dispatcher.on$(A.GAME_SELECT_CARD),
      playerAndGame$.map(([game, player]) => {
        const ourPlayer = _.find(game.players, {id: player.id})
        return ourPlayer && game.step === A.STEP_CHOOSE_WHITES && ourPlayer.isPlaying
      })
    )

    this.opSelectStack$ = mapOp$(
      dispatcher.on$(A.GAME_SELECT_STACK),
      playerAndGame$.map(([game, player]) => {
        const ourPlayer = _.find(game.players, {id: player.id})
        return ourPlayer && game.step === A.STEP_JUDGE_STACKS && ourPlayer.isCzar
      })
    )
  }
}
