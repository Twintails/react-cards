import React from "react"
import {
  Route
//   // Link
} from 'react-router-dom'


import AppContainer from "./components/app/"
import Lobby from "./components/lobby/"
import Game from "./components/game/"

export const routes = [
  { path: '/',
    component: AppContainer,
    routes: [
      { path: '/lobby',
        exact: true,
        ...Lobby
      },
      { path: '/game/:gameId',
        ...Game
      }
    ]
  }
]

// function filterSubPaths(element) {
//   if ( this === element.path ){
//     return element.path
//   }
// }

export const RouteWithSubRoutes = (route) => {
  // if ( route.routes ) {
  //   route.mypath = route.routes.filter( filterSubPaths, route.location.pathname)
  // }
  return (
    <Route path={route.location.pathname} render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes}/>
    )}/>
  )
}
