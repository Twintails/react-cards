import "./lobby.scss"
import React from "react"
import PropTypes from 'prop-types'
import { ContainerBase } from "../../lib/component"
import Chat from "../chat"
import * as A from "../../actions"

class LobbyContainer extends ContainerBase {
  static contextTypes = {
    ...ContainerBase.contextTypes,
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this._joinGame = (game) => {
      // console.log("GAME: ", game)
      // console.log(`TODO: JOIN GAME ${game.title}`)
      return (`TODO: JOIN GAME ${game.title}`)
    }

    this._sendMessage = (message) => {
      // console.log(`Sending: ${message}`)
      return (`Sending: ${message}`)
    }
  }

  render() {
    const games = [
      {title: "Game 1", id: 1, players: ["Jimbo", "Lydia", "Horace"]},
      {title: "Game 2", id: 2, players: ["George", "Marci", "Tannon"]},
      {title: "Game 3", id: 3, players: ["Valora", "Bezy", "Monito"]},
      {title: "Game 4", id: 4, players: ["Carci", "Vancho", "Paltio"]},
      {title: "Game 5", id: 5, players: ["Gamma", "Phi", "Zelto"]},
    ]

    const opSendMessage = { can: true, inProgress: false }
    const messages = [
      {index: 1, name: "Human", message: "Cow Houses are RED!"},
      {index: 2, name: "Chicken", message: "Cow Houses are white!"},
      {index: 3, name: "Goat", message: "Cow Houses are green! Green! Greeeeeen! GREEEEEEEEN! GUH-REEEN! Green! Cowh Houses are Green! Thank you!"},
      {index: 4, name: "Cow", message: "Cow Houses are RED!"},
      {index: 5, name: "Sheep", message: "Cow Houses are white!"},
      {index: 6, name: "Human", message: "Cow Houses are RED!"},
      {index: 7, name: "Chicken", message: "Cow Houses are white!"},
      {index: 8, name: "Goat", message: "Cow Houses are green!"},
      {index: 9, name: "Cow", message: "Cow Houses are RED!"},
      {index: 10, name: "Sheep", message: "Cow Houses are white!"},
      {index: 11, name: "Human", message: "Cow Houses are RED!"},
      {index: 12, name: "Chicken", message: "Cow Houses are white!"},
      {index: 13, name: "Goat", message: "Cow Houses are green!"},
      {index: 14, name: "Cow", message: "Cow Houses are RED!"},
      {index: 15, name: "Sheep", message: "Cow Houses are white!"},
      {index: 16, name: "Human", message: "Cow Houses are RED!"},
      {index: 17, name: "Chicken", message: "Cow Houses are white!"},
      {index: 18, name: "Goat", message: "Cow Houses are green!"},
      {index: 19, name: "Cow", message: "Cow Houses are RED!"},
      {index: 20, name: "Sheep", message: "Cow Houses are white!"}
    ]

    return (
      <div className="main c-lobby">
        <GameList games={games} joinGame={this._joinGame}/>
        <Chat opSendMessage={opSendMessage} sendMessage={this._sendMessage} messages={messages}/>
      </div>
    )
  }
}

class LobbySidebar extends ContainerBase {
  static contextTypes = {
    ...ContainerBase.contextTypes,
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this._login = () => {
      this.dispatch(A.dialogSet(A.DIALOG_LOGIN, true))
    }

    this._createGame = () => {
      // console.log("TODO: Create Game")
    }

    this._createGameInProgress = () => {
      // console.log("TODO: Create Game")
      return
    }
  }
  render() {
    const canLogin = true
    const canCreateGame = true
    return (
      <section className="sidebar c-lobby-sidebar">
        <div className="m-sidebar-buttons">
          {!canLogin ? null : <button className="m-button primary" onClick={this._login}>Login</button>}
          {!canCreateGame ? null :
            <button className="m-button good" onClick={this._createGame} disabled={!this._createGameInProgress || "disabled"}>Create Game
            </button>}
        </div>
      </section>
    )
  }
}

function GameList({games, joinGame}) {
  return (
    <section className="c-game-list">
      {games.length > 0 ? null : <div className="no-game">No Games availiable yet</div>}

      {games.map(game =>
        <div className="game" key={game.id} onClick={() => joinGame(game)}>
          <div className="title">{game.title}</div>
          <div className="players">{game.players.join(", ")}</div>
          <div className="join-game">Join Game</div>
        </div>)}
    </section>
  )
}

export default {
  main: LobbyContainer,
  sidebar: LobbySidebar
}
