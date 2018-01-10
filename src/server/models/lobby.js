import _ from "lodash"
import * as A from "../actions"
import { RoomBase } from "../lib/room"
import { Game } from "./game"

export class Lobby extends RoomBase {
  get view() {
    return {
      messages: this.messages.slice(),
      games: this.games.map(game => ({
        id: game.id,
        title: game.title,
        players: game.players.map(p => p.name)
      }))
    }
  }

  constructor(app) {
    super(A.VIEW_LOBBY)
    this.messages = []
    this.games = []
    this.app = app

    this._nextGameId = 1

    app.dispatcher.on({
      [A.GAME_DISPOSED]: ({gameId}) => this.removeGame(gameId),
      [A.GAME_SUMMARY_CHANGED]: () => this._tick()
    })
  }

  sendMessage(client, message) {
    if (!client.isLoggedIn)
      throw new Error("Client must be logged in")

    this._tick(() => {
      this.messages.push({
        index:this.messages.length + 1,
        name: client.name,
        message
      })
    })
  }

  createGame(title) {
    const game = new Game(this._nextGameId++, title, this.app)
    this._tick(() => this.game.push(game))
    return game
  }

  removeGame(gameId) {
    this._tick(() => _.remove(this.game, {id: gameId}))
  }

  getGameById(gameId) {
    return _.find(this.game, {id: gameId})
  }
}
