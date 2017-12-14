import "./game.scss"

import React from "react"
import { ContainerBase } from "../../lib/component"

class GameContainer extends ContainerBase {
  constructor(props) {
    super(props)
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
