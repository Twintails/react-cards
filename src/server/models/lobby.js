import _ from "lodash"
import * as A from "../actions"
import { RoomBase } from "../lib/room"

export class Lobby extends RoomBase {
  get view() {
    return {
      message: this.message.slice(),
      games: this.games.map(game => ({
        id: game.id,
        title: game.title,
        players: game.players.map(p => p.name)
      }))
    }
  }

  constructor(app) {
    super(A.VIEW_LOBBY)
    this.message = []
    this.game = []
    this.app = app

    this._nextGameId = 1
  }

  sendMessage(client, message) {
    if (!client.isLoggedIn)
      throw new Error("Client must be logged in")

    this._tick(() => {
      this.messages.push({
        index:this.message.length + 1,
        name: client.name,
        message
      })
    })
  }
}
