import "./header.scss"

import React from "react"
import { ContainerBase } from "../../lib/component"

import ReactSVG from 'react-svg';

// const Cow = require('./cow.svg')

class Header extends ContainerBase {
  constructor (props) {
    super (props)
    this._click = this._click.bind(this)
  }

  componentDidMount () {
    // console.warn("Barn Rasins")
  }

  _click (e) {
    alert(`"${e.target.className}" Click should probably do something ya'know 🙃\n`)
  }

  render () {
    return (
      <header>
        <ReactSVG
          path="/img/cow.svg"
          className="icon"
          id="cow"
        />
        <h1>Cow Houses</h1>
        {/* <button className="login" onClick={this._click}>Login</button> */}
      </header>
    )
  }
}

export default Header
