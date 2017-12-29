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
    cardSets: [
      {id: "starter", name: "Starter Pack"},
      {id: "red", name: "Red Box"},
      {id: "blue", name: "Blue Box"},
      {id: "green", name: "Green Box"},
    ]
  },
  players: [
    {id: 1, name: "Horace", score: 4, isCzar: false, isPlaying: false, isWinner: true},
    {id: 2, name: "Valora", score: 2, isCzar: false, isPlaying: true, isWinner: false},
    {id: 3, name: "Betszy", score: 1, isCzar: true, isPlaying: false, isWinner: false},
    {id: 4, name: "Monito", score: 1, isCzar: false, isPlaying: false, isWinner: false}
  ],
  messages: [
    {index: 1, name: "Human", message: "Cow Houses are RED!"},{index: 2, name: "Chicken", message: "Cow Houses are white!"},
    {index: 3, name: "Goat", message: "Cow Houses are green! Green! Greeeeeen! GREEEEEEEEN! GUH-REEEN! Green! Cowh Houses are Green! Thank you!"},{index: 4, name: "Cow", message: "Cow Houses are RED!"},
    {index: 5, name: "Sheep", message: "Cow Houses are white!"},{index: 6, name: "Human", message: "Cow Houses are RED!"},
    {index: 7, name: "Chicken", message: "Cow Houses are white!"},{index: 8, name: "Goat", message: "Cow Houses are green!"},
    {index: 9, name: "Cow", message: "Cow Houses are RED!"},{index: 10, name: "Sheep", message: "Cow Houses are white!"},
    {index: 11, name: "Human", message: "Cow Houses are RED!"},{index: 12, name: "Chicken", message: "Cow Houses are white!"},
    {index: 13, name: "Goat", message: "Cow Houses are green!"},{index: 14, name: "Cow", message: "Cow Houses are RED!"},
    {index: 15, name: "Sheep", message: "Cow Houses are white!"},{index: 16, name: "Human", message: "Cow Houses are RED!"},
    {index: 17, name: "Chicken", message: "Cow Houses are white!"},{index: 18, name: "Goat", message: "Cow Houses are green!"},
    {index: 19, name: "Cow", message: "Cow Houses are RED!"},{index: 20, name: "Sheep", message: "Cow Houses are white!"}
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
