import "./game-board.scss"

import React from "react"
// import _ from "lodash"
import * as A from "../../actions"
import { ContainerBase } from "../../lib/component"

import Card from "./card"
import PlayerHand from "./player-hand"
import Stacks from "./stacks"

const TIMERS = {
  [A.WAIT_GAME_OVER]:              "Game Over",
  [A.WAIT_REASON_GAME_FINISHED]:   "Game Fin!",
  [A.WAIT_REASON_TOO_FEW_PLAYERS]: "Not Enough Players",
  [A.WAIT_ROUND_OVER]:             "Round Over",
  [A.WAIT_REASON_CZAR_LEFT]:       "Czar MIA",
  [A.WAIT_REASON_ROUND_FINISHED]:  "Round Fin!"
}

export default class GameBoard extends ContainerBase {
  constructor(props) {
    super(props)

    this.state = {isHandOpen: false}
    this._selectCard = card => this.request(A.gameSelectCard(this.state.game.id, card.id))
    this._selectStack = stack => this.request(A.gameSelectStack(this.state.game.id, stack.id))
    this._toggleHand = () => this.setState({isHandOpen: !this.state.isHandOpen})
  }

  componentWillMount() {
    const {stores: {game}} = this.context
    this.subscribe(game.view$, game => this.setState({game}))
    this.subscribe(game.player$, player => this.setState({player}))
    this.subscribe(game.opSelectCard$, opSelectCard => this.setState({opSelectCard}))
    this.subscribe(game.opSelectStack$, opSelectStack => this.setState({opSelectStack}))
  }

  render() {
    const {game, player, opSelectCard, opSelectStack, isHandOpen} = this.state
    const round = game.round, timer = game.timer || {}
    let message = null, messageIsActive = false

    if (!round)
      return null

    switch (game.step) {
      case A.STEP_CHOOSE_WHITES:
        messageIsActive = opSelectCard.can
        message = opSelectCard.can
          ? "Please choose your cards."
          : "Waiting for other players to join the game."
        break

      case A.STEP_JUDGE_STACKS:
        messageIsActive = opSelectStack.can
        message = opSelectStack.can
          ? "please select the winning cards."
          : "Waiting on the czar to decide a winner."
        break

      case A.STEP_WAIT:
        message = `${TIMERS[timer.type]}, ${TIMERS[timer.reason]}`
        break
    }

    const ourStackId = game.step === A.STEP_CHOOSE_WHITES && player && player.stack && player.stack.id

    const stacks = ourStackId ? round.stacks.map(s => s.id === ourStackId ? player.stack : s) : round.stacks

    return (
      <section className="c-game-board">
        <div className="black-card">
          <Card type="black" card={round.blackCard} />
          <div className={`game-status ${messageIsActive} ? "is-active" : ""`}>{message}</div>
        </div>
        <Stacks
          stacks={stacks}
          ourStackId={ourStackId}
          opSelectStack={opSelectStack}
          selectStacks={this._selectStacks} />
        <PlayerHand
          opSelectCard={opSelectCard}
          selectCard={this._selectCard}
          hand={player.hand}
          toggle={this._toggleHand}
          isOpen={isHandOpen} />
      </section>
    )
  }
}
