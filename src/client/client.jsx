import "./client.scss"

import React from "react"
import ReactDOM from "react-dom"
// import { AppContainer } from "react-hot-loader"
import { BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

// import AppContainer from "./components/app"


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


function renderRoutes () {

  const RouteWithSubRoutes = require("./routes").RouteWithSubRoutes
  const routes = require( "./routes").routes
  console.log("CLIENT ROUTES: ", routes)
  ReactDOM.render(
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </Switch>
      {/* <Redirect from='*' to='/lobby' /> */}
    </Router>,
    document.getElementById("mount")
  )
}


//RENDER
if (module.hot) {
  module.hot.accept("./routes", () => { renderRoutes() })
}

renderRoutes()
