import "./client.scss"

// import React from "react"
import ReactDOM from "react-dom"
// import { AppContainer } from "react-hot-loader"
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'


// import Main from "./components/main"


// const render = Routes => {
//   ReactDOM.render(
//     <AppContainer>
//       <Routes />
//     </AppContainer>,
//     document.getElementById('mount')
//   )
// }

function render() {
  const routes = require( "./routes").default()
  ReactDOM.render(routes, document.getElementById("mount"))
}

render()

if (module.hot) {
  module.hot.accept("./routes", () => { render() })
}
