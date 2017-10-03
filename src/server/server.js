import express from 'express'
import http from 'http'

import { isDevelopment } from './settings'

/*_________________________________________
|
|  Setup
|
|_________________________________________*/

const app = express()
const server = new http.Server(app)


/*_________________________________________
|
|  Config
|
|_________________________________________*/

app.set("view engine", "pug")
app.use(express.static("public"))

const useExternalStyles = !isDevelopment
const scriptRoot = isDevelopment
                 ? "http://localhost:8080/build/"
                 : "/build/"

app.get("*", (req, res) => {
  res.render("index", {
    useExternalStyles,
    scriptRoot
  })
})


const port = process.env.PORT || 8085
server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
