import * as A from "../actions"
import { Dispatcher } from "../shared/dispatcher"
import { RoomBase } from "../lib/room"

export class Application extends RoomBase {
  get view() {
    return {
      cardSets: this.cards.sets
    }
  }

  constructor(cards) {
    super(A.VIEW_APP)
    this.dispatcher = new Dispatcher()
    this.cards = cards
    // TODO: Make Lobby
  }
}