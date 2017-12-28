import "./game-setup.scss"

import React from "react"
import _ from "lodash"
import * as A from "../../actions"
import { ContainerBase } from "../../lib/component"

export default class GameSetup extends ContainerBase {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className="c-game-setup">GAME Setup HERE-ish</section>
    )
  }
}
