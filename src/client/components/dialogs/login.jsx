import "./login.scss"

import React from "react"
import * as A from "../../actions"
import { ContainerBase } from "../../lib/component"
import { TextInput } from "../controls"

class LoginDialog extends ContainerBase {
  constructor(props) {
    super(props)

    this._close = (e) => {
      e.preventDefault()
      this.dispatch(A.dialogSet(A.DIALOG_LOGIN, false))
    }

    this._login = (e) => {
      e.preventDefault()
      this.request(A.userLogin(this._username.value))
    }

    this.state = {
      opLogin: { can: true, inProgress: false }
    }

  }

  render() {
    const {opLogin} = this.state
    const disabled = opLogin.inProgress

    return (
      <section className="c-dialog">
        <a className="c-dialog-close" aria-hidden="true" onClick={this._close}><span className="screen-reader-text">Close</span></a>
        <header>Please Sign In</header>
        <form onSubmit={this._login} disabled={disabled}>
          <div className="row">
            <TextInput
              id="usernameInput"
              placeholder="username"
              ref={c=> this._username = c}
              disabled={disabled || !opLogin.can}/>
          </div>
          {!opLogin.error ? null : <p className="error">{opLogin.error}</p>}
          <div className="row">
            <button className="m-button good" disabled={disabled || !opLogin.can}>Sign In</button>
            {/* <button className="m-button close-button" onClick={this._close}>Close</button> */}
          </div>
        </form>
      </section>
    )
  }
}

export default {
  id: A.DIALOG_LOGIN,
  component: LoginDialog
}
