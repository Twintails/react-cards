import _ from "lodash"
import { Observable, BehaviorSubject } from "rxjs"
import * as A from "../actions"

const defaultView = {
  cardSets: [
    {id: "starter", name: "Starter Pack"},
    {id: "red", name: "The Red Box"},
    {id: "blue", name: "The Blue Box"},
    {id: "green", name: "The Green Box"},
  ]
}

export default class AppStore {
  constructor({dispatcher}) {
    this.view$ = new BehaviorSubject(defaultView)
    this.dialogs$ = dispatcher
      .on$(A.DIALOG_SET)
      .scan((stack, action) => {
        _.remove(stack, {id: action.id})

        if (action.isOpen) {
          stack.push({id: action.id, props: action.props})
        }

        return stack

      }, [])
      .startWith([])
      .publishReplay(1)

    this.dialogs$.connect()

    this.connection$ = new BehaviorSubject(A.CONNECTION_CONNECTED)
    this.reconnected$ = Observable.empty()
  }
}
