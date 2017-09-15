const cow = {
  sound: "moo",
  color: "Piebald",
  weight: 0.8
}

const bull = {
  ...cow,
  weight: 1.1
}

console.log(`The Cow says ${cow.sound}, is ${color} in coloring, and weighs an average of ${weight} Tonnes.`)
console.log(`However, the Bull weighs an average of ${weight} Tonnes.`)
