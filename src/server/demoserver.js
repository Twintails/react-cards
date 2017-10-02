import React, { Component } from 'react'

const cow = {
  sound: "moo",
  color: "Piebald",
  weight: 0.8
}
const bull = {
  ...cow,
  weight: 1.1
}

console.log(`The Cow says ${cow.sound}, is ${cow.color} in coloring, and weighs an average of ${cow.weight} Tonnes.`)
console.log(`However, the Bull weighs an average of ${bull.weight} Tonnes.`)

function fail() {
  throw new Error("Fart Nuggets!")
}
// fail()

class AppComponent {
  static PropTypes = {
    sound: "hurm"
  }
}
console.log(<AppComponent />)
