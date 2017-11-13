import "./client.scss"

import React from "react"
import ReactDOM from "react-dom"
// import { AppContainer } from "react-hot-loader"
import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

// import Main from "./components/main"


// const render = Routes => {
//   ReactDOM.render(
//     <AppContainer>
//       <Routes />
//     </AppContainer>,
//     document.getElementById('mount')
//   )
// }

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work


const render = function renderRoutes() {
  const RouteWithSubRoutes = require("./routes").RouteWithSubRoutes
  const routes = require( "./routes").routes
  ReactDOM.render(
    <Router history={history}>
      <div>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    </Router>,
    document.getElementById("mount")
  )
}

if (module.hot) {
  module.hot.accept("./routes", () => { render() })
}

render()
