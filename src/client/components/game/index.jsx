import "./game.scss"

import React from "react"
import { ContainerBase } from "../../lib/component"
import * as A from "../../actions"

class GameContainer extends ContainerBase {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {stores: {app}} = this.context
    const {params} = this.props.match
    console.log(this.props)
    const gameId = parseInt(params.gameId)

    this.subscribe(app.reconnected$, () => this.request(A.gameJoin(gameId)))

    this.request(A.gameJoin(gameId))
  }

  render() {
    return (
      <p>GAME!</p>
    )
  }
}

class GameSidebar extends ContainerBase {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <p>GAME Aside!</p>
    )
  }
}

export default {
  main: GameContainer,
  sidebar: GameSidebar
}
