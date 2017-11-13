import "./lobby.scss"

import React, { Component } from "react"

class LobbyContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <p>LOBBY!</p>
    )
  }
}

class LobbySidebar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <p>LOBBY Aside!</p>
    )
  }
}

export default {
  main: LobbyContainer,
  sidebar: LobbySidebar
}
