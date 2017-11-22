import "./lobby.scss"
import React, { Component } from "react"
import Chat from "../chat"

class LobbyContainer extends Component {
  constructor(props) {
    super(props)

    this._joinGame = (game) => {
      console.log("GAME: ", game)
      console.log(`TODO: JOIN GAME ${game.title}`)
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

    return (
      <div className="c-lobby">
        <GameList games={games} joinGame={this._joinGame}/>
        <Chat />
      </div>
    )
  }
}

class LobbySidebar extends Component {
  constructor(props) {
    super(props)

    this._login = () => {
      console.log("TODO: Implement Login")
    }

    this._createGame = () => {
      console.log("TODO: Create Game")
    }

    this._createGameInProgress = () => {
      console.log("TODO: Create Game")
    }
  }
  render() {
    const canLogin = true
    const canCreateGame = true
    return (
      <section className="c-lobby-sidebar">
        <div className="m-sidebar-buttons">
          {!canLogin ? null : <button className="m-button primary" onClick={this._login}>Login</button>}
          {!canCreateGame ? null :
            <button className="m-button good" onClick={this._createGame} disabled={this._createGameInProgress}>Create Game
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
