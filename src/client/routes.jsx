import React from "react"
import {
  Route
//   // Redirect//,
//   // Link
} from 'react-router-dom'


import AppContainer from "./components/app/"
// import Header from "./components/header/"
import Lobby from "./components/lobby/"
import Game from "./components/game/"

export const routes = [
  { path: '/',
    component: AppContainer,
    routes: [
      { path: '/lobby',
        components: Lobby
      },
      { path: '/game/:gameId',
        components: Game//,
        // routes: [
        //   { path: '/game/:gameId',
        //     component: Bus
        //   },
        //   { path: '/game/cart',
        //     component: Cart
        //   }
        // ]
      }
    ]
  }
]



export const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)
