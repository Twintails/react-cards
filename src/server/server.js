import express from 'express'
import http from 'http'
import path from "path"
import fs from "fs"

import { isDevelopment } from './settings'
import { CardDatabase } from "./models/cards"

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
const scriptRoot = isDevelopment ? "http://localhost:8080/build/" : "/build/"

app.get("*", (req, res) => {
  res.render("index", {
    useExternalStyles,
    scriptRoot
  })
})

/*_________________________________________
|
|  Services
|
|_________________________________________*/
const cards = new CardDatabase()
const setsPath = path.join(global.appRoot, "data", "sets")

for ( let file of fs.readdirSync(setsPath)) {
  const setId = path.parse(file).name
  const setPath = path.join(setsPath, file)
  cards.addSet(setId, JSON.parse(fs.readFileSync(setPath, "utf-8")))
}

console.log(cards.generateDecks()) // eslint-disable-line no-console


/*_________________________________________
|
|  Bootup
|
|_________________________________________*/
const port = process.env.PORT || 8085
server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
