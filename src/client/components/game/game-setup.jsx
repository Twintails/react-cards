import "./game-setup.scss"

import React from "react"
import _ from "lodash"
import * as A from "../../actions"
import { ContainerBase } from "../../lib/component"

export default class GameSetup extends ContainerBase {
  constructor(props) {
    super(props)

    // set score scoreLimit
    this._setScoreLimit = (e) => {
      if (!this.state.opSetOptions.can)
        return

      this.request(A.gameSetOptions(this.state.game.id, {
        ...this.state.game.options,
        scoreLimit: parseInt(e.target.value)
      }))
    }

    // toggle sets on/off
    this._toggleSet = (set) => {
      const {opSetOptions, game: {options, id}} = this.state

      const newSets = set.isSelected
        ? options.cardSets.filter(setId => setId != set.id)
        : options.cardSets.concat(set.id)


      if (!opSetOptions.can)
        return

      this.request(A.gameSetOptions(id, {
        ...options,
        sets: newSets
      }))
    }

    // start game
    this._startGame = (e) => {
      const {opStart, game: {id}} = this.state
      e.preventDefault()

      if (!opStart.can)
        return

      this.request(A.gameStart(id))
    }
  }

  componentWillMount() {
    const {stores: {app, game}} =  this.context
    this.subscribe(app.view$.map(v => v.cardSets), cardSets => this.setState({cardSets}))
    this.subscribe(game.view$, game => this.setState({game}))
    this.subscribe(game.opSetOptions$, opSetOptions => this.setState({opSetOptions}))
    this.subscribe(game.opStart$, opStart => this.setState({opStart}))
  }

  render() {
    const {cardSets, game: {options}, opSetOptions, opStart} = this.state

    const setList = cardSets.map(set => ({
      id: set.id,
      name: set.name,
      isSelected: options.cardSets.includes(set.id)
    }))

    const disabled = !opSetOptions.can || opSetOptions.inProgress || opStart.inProgress

    const error = opStart.error || opSetOptions.error

    return (
      <section className={`c-game-setup ${disabled ? "disabled" : "enabled"}`}>
        <header>Game Options</header>
        {!error ? null : <div className="error">{error}</div>}
        <form className="body">
          <div className="form-row">
            <label>Score Limit:</label>
            <select value={options.scoreLimit} onChange={this._setScoreLimit} disabled={disabled}>
              {_.range(4, 50).map(i => <option value={i} key={i}>{i}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>Sets:</label>
            <SetList cardSets={setList} toggleSet={this._toggleSet} />
          </div>
          <button className="m-button start-game primary" onClick={this._startGame} disabled={disabled}>Start Game</button>
        </form>
      </section>
    )
  }
}

function SetList({cardSets, toggleSet}) {
  return (
    <ul className="sets-list">
      {cardSets.map(set => <li key={set.id} className={set.isSelected ? "is-selected" : "unselected"} onClick={() => toggleSet(set)}>{set.name}</li>)}
    </ul>
  )
}
