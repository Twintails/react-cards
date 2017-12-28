import _ from "lodash"
import { Observable, BehaviorSubject } from "rxjs"
import { Validator } from "../../server/shared/validation"
import { validateMessage } from "../../server/shared/validation/chat"
import { mapOp$ } from "../../server/shared/observable"
import * as A from "../actions"

const defaultView  = {
  id: 42,
  title: "Horace's Game",
  step: A.STEP_SETUP,
  options: {
    scoreLimit: 5,
    sets: ["1ed"]
  },
  players: [
    {id: 1, name: "Horace", score: 0, isCzar: false, isPlaying: false, isWinner: false},
    {id: 2, name: "Valora", score: 0, isCzar: false, isPlaying: false, isWinner: false},
    {id: 3, name: "Betszy", score: 0, isCzar: false, isPlaying: false, isWinner: false},
    {id: 4, name: "Monito", score: 0, isCzar: false, isPlaying: false, isWinner: false}
  ],
  round: null,
  timer: null
}

const defaultPlayerView = {
  id: 1,
  hand: [],
  stack: null
}

export default class GameStore {
  constructor({dispatcher}, user) {
    const isLoggedIn$ = user.details$.map(d => d.isLoggedIn)
    const playerAndGame$ = Observable.combineLatest(this.view$, this.player$)

    dispatcher.onRequest({
      [A.GAME_CREATE]:       action => { dispatcher.succeed(action); dispatcher.succeed(A.gameJoin(action.gameId)); },
      [A.GAME_JOIN]:         action => dispatcher.succeed(action),
      [A.GAME_SET_OPTIONS]:  action => dispatcher.succeed(action),
      [A.GAME_START]:        action => dispatcher.succeed(action),
      [A.GAME_SELECT_CARD]:  action => dispatcher.succeed(action),
      [A.GAME_SELECT_STACK]: action => dispatcher.succeed(action),
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
        dispatcher.succeed(action)
      }

    })

    this.view$ = new BehaviorSubject(defaultView)
    this.player$ = new BehaviorSubject(defaultPlayerView)

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
