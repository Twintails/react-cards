import "./chat.scss"
import React, { Component } from 'react'
import { TextInput } from "../controls"

export default class Chat extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <TextInput className="top-border"/>
    )
  }
}
