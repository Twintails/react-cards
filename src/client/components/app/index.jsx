import "./main.scss"
// import Header from "../header/"

import React, { Component } from "react"
// import ReactSVG from 'react-svg';

// const Cow = require('./cow.svg')

class AppContainer extends Component {
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
    const{main, sidebar} = this.props
    return (
      <div className={`c-application`}>
        <div className="inner">
          <div className="sidebar">{sidebar}</div>
          <div className="main">{main}</div>
        </div>
      </div>
    )
  }
}

export default AppContainer
