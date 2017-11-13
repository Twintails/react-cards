import "./game.scss"

import React, { Component } from "react"

class GameContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <p>GAME!</p>
    )
  }
}

class GameSidebar extends Component {
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
