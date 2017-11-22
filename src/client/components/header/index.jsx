import "./header.scss"

import React, { Component } from "react"
import ReactSVG from 'react-svg';

// const Cow = require('./cow.svg')

class Header extends Component {
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
          path="./cow.svg"
          className="icon"
          id="cow"
        />
        <h1>Cow Houses are Colorful in Green!</h1>
        <button className="login" onClick={this._click}>Login</button>
      </header>
    )
  }
}

export default Header
