import { Dispatcher } from "../dispatcher"
import * as A from "../actions"

const TEST_ACTION_1 = "TEST_ACTION_1"
const TEST_ACTION_2 = "TEST_ACTION_2"
const testAction1 = (arg) => ({type: TEST_ACTION_1, arg})
const testAction2 = (arg) => ({type: TEST_ACTION_2, arg})

describe('The Dispatcher', () => {
  let dispatcher
  beforeEach(() => dispatcher = new Dispatcher())


  it('Dispatches a simple action', () => {
    let act1Res

    dispatcher.on(TEST_ACTION_1, action => {
      act1Res = action.arg
    })

    dispatcher.emit(testAction1(42))
    expect(act1Res).toBe(42)
  })


  it('allows an unsubscribe', () => {
    let count = 0
    const sub = dispatcher.on(TEST_ACTION_1, () => count++)

    dispatcher.emit(testAction1(4))
    sub()
    dispatcher.emit(testAction1(1))
    expect(count).toBe(1)
  })


  it('allows object syntax for actions', () => {
    let action1Count = 0
    let action2Count = 0

    dispatcher.on({
      [TEST_ACTION_1]: () => action1Count++,
      [TEST_ACTION_2]: () => action2Count++
    })

    dispatcher.emit(testAction1(12))
    dispatcher.emit(testAction2())

    expect(action1Count).toBe(1)
    expect(action2Count).toBe(1)
  })


  it('allows subscription with rxjs', () => {
    let action1Arg
    dispatcher.on$(TEST_ACTION_1).subscribe(action => action1Arg = action.arg)

    dispatcher.emit(testAction1(42))

    expect(action1Arg).toBe(42)
  })
})
