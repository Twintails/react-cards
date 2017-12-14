import "./controls.scss"
import React from 'react'
import { ContainerBase } from "../../lib/component"


export class TextInput extends ContainerBase {
  constructor(props) {
    super(props)
  }

  get value() {
    return this.input.value
  }

  set value(value) {
    this.input.value = value
  }

  render() {
    const props = this.props

    return (
      <div className={(`m-textbox ${props.className || ""}`).trim()}>
        <label htmlFor="comment">Add a Comment: </label>
        <input id="comment" type="text" {...props} ref={c => this.input = c}/>
        <div className="border"></div>
      </div>
    )
  }
}
