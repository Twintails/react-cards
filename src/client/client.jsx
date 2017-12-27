import url from "./client.scss" // eslint-disable-line no-unused-vars

import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import * as A from "./actions"
import { Dispatcher } from "shared/dispatcher"
import { StoreProvider } from "./lib/component"
import createStores from "./stores"

//SERVICES
const dispatcher = new Dispatcher()
const services = {dispatcher}

if (IS_DEVELOPMENT) {
  dispatcher.on("*", printAction)
}

//STORES
const stores = createStores(services)


// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work


function renderRoutes () {

  const RouteWithSubRoutes = require("./routes").RouteWithSubRoutes
  const routes = require( "./routes").routes
  // console.log("CLIENT ROUTES: ", routes)
  ReactDOM.render(
    <StoreProvider stores={stores} services={services}>
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))}
          <Redirect from='*' to='/lobby' />
        </Switch>
      </Router>
    </StoreProvider>,
    document.getElementById("mount")
  )
}


//RENDER
if (module.hot) {
  module.hot.accept("./routes", () => { renderRoutes() })
}

renderRoutes()



// HELPERS
/* eslint-disable no-console */
function printAction (action) {
  if (action.hasOwnProperty("status")) {
    let style = null
    switch (action.ststus) {
      case A.STATUS_REQUEST: style = "color: blue"
        break
      case A.STATUS_FAIL: style = "color: red"
        break
      case A.STATUS_SUCCESS: style = "color: green"
        break
    }

    console.log(`%c${action.type}`,`${style}; font-weight: bold; background: #eee; width: 100%; display: block;`)
  } else {
    console.log(`%c${action.type}`,"background: #ddd;")
  }

  const result = _.omit(action, ["type", "status"])
  if (_.keys(result).length) {
    console.log(result)
  }
}
/* eslint-enable no-console */
