import "./main.scss"
import Header from "../header/"

import React from "react"
import {
  Route
//   // Link
} from 'react-router-dom'
import { ContainerBase } from "../../lib/component"
import * as A from "../../actions"
import dialogTypes from "../dialogs"

class AppContainer extends ContainerBase {
  constructor (props) {
    super (props)
    this._click = this._click.bind(this)
  }

  componentWillMount () {
    const {stores: {app}, services: {dispatcher}} = this.context
    const router = this.props
    if (router.location.pathname === "/") {
      console.log("MOOOOOOvin you on over to the lobby!") // eslint-disable-line no-console
      router.history.push("/lobby")
    }
    this.subscribe(app.dialogs$, dialogs => this.setState({dialogs}))

    this.subscribe(
      dispatcher.onSuccess$(A.GAME_JOIN),
      action => {
        const path = `/game/${action.gameId}`
        if (router.location.pathname === path)
          return

        router.history.push(path)
      }
    )
    this.subscribe(
      dispatcher.onSuccess$(A.LOBBY_JOIN),
      () => {
        if (router.location.pathname === "/")
          return

        router.history.push("/lobby")
      }
    )
  }

  _click (e) {
    alert(`"${e.target.className}" Click should probably do something ya'know 🙃\n`)
  }

  render () {
    // const { main, sidebar } = this.props
    const { dialogs } = this.state

    const dialogStack = dialogs.map(dialog => {
      const DialogComponent = dialogTypes[dialog.id]
      return <DialogComponent {...dialog.props} key={dialog.id} />
    })
    // TODO: repair new RR4 settings to not show all routes in DOM
    return (
      <div className={`c-application ${dialogStack.length ? "dialogs-open" : "dialogs-closed"}`}>

        <div className="dialogs">{dialogStack}</div>
        <div className="inner">
          <div className="sidebar">
            <Header />
            {this.props.routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </div>
          <div className="main">
            {this.props.routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default AppContainer
