import "./main.scss"
import Header from "../header/"

import React, { Component } from "react"
import {
  Route
//   // Link
} from 'react-router-dom'
// import ReactSVG from 'react-svg';

// const Cow = require('./cow.svg')

class AppContainer extends Component {
  constructor (props) {
    super (props)
    this._click = this._click.bind(this)
  }

  componentDidMount () {
    console.warn("Barn Rasins")
  }

  _click (e) {
    alert(`"${e.target.className}" Click should probably do something ya'know 🙃\n`)
  }

  render () {
    console.log("APP PROPS: ", this.props )
    const{main, sidebar} = this.props
    return (
      <div className={`c-application`}>
        <Header />
        <div className="inner">
          <div className="sidebar">{this.props.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}</div>
          <div className="main">{this.props.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}</div>
        </div>
      </div>
    )
  }
}

export default AppContainer
