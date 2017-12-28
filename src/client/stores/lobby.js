import { Observable } from "rxjs"
import { Validator } from "../../server/shared/validation"
import { validateMessage } from "../../server/shared/validation/chat"
import { mapOp$ } from "../../server/shared/observable"
import * as A from "../actions"

const defaultView = {
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
  games: [
    {title: "Game 1", id: 1, players: ["Jimbo", "Lydia", "Horace"]},{title: "Game 2", id: 2, players: ["George", "Marci", "Tannon"]},
    {title: "Game 3", id: 3, players: ["Valora", "Bezy", "Monito"]},{title: "Game 4", id: 4, players: ["Carci", "Vancho", "Paltio"]},
    {title: "Game 5", id: 5, players: ["Gamma", "Phi", "Zelto"]},
  ]
}

export default class LobbyStore {
  constructor({dispatcher}, user) {
    this.view$ = Observable.of(defaultView)

    dispatcher.onRequest({
      [A.LOBBY_JOIN]: action => dispatcher.succeed(action),
      [A.LOBBY_SEND_MESSAGE]: action => {
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

    this.opSendMessage$ = mapOp$(
      dispatcher.on$(A.LOBBY_SEND_MESSAGE),
      user.details$.map(u => u.isLoggedIn)
    )
  }
}
