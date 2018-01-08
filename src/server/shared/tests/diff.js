import _ from "lodash"
import { makeDiff, mergeDiff, IS_UNCHANGED } from "../diff"

runDiffTests({
  scalar: {
    "changed on numbers": [1,2,2],
    "unchanged on numbers": [1,1,IS_UNCHANGED],
    "changed on type": [1,"1","1"],
    "unchanged on null": [null,null,IS_UNCHANGED]
  },
  array: {
    "Throws on invalid type": () => {
      expect(() => makeDiff("Moo", [])).toThrow()
    },
    "Unchanged on empty": [
      [],[],IS_UNCHANGED
    ],
    "empties array": [
      [1,2,3], [], {$splice: [0,3]}
    ],
    simple: {
      "unchanged": [
        [1,2,3], [1,2,3], IS_UNCHANGED
      ],
      "splice": [
        [1,2,3], [1,2,4,5], {$splice: [2,1,4,5]}
      ],
      "add one at end": [
        [1,2,3], [1,2,3,4], {$splice: [3,0,4]}
      ],
      "remove one at end": [
        [1,2,3], [1,2], {$splice: [2,1]}
      ],
      "remove a middle man": [
        [1,2,3], [1,3], {$splice: [1,2,3]}
      ]
    },
    complex: {
      "unchanged": [
        [
          {id: 1, text: "old"},
          {id: 2, text: "new"},
          {id: 3, text: "newer"}
        ],
        [
          {id: 1, text: "old"},
          {id: 2, text: "new"},
          {id: 3, text: "newer"}
        ],
        IS_UNCHANGED
      ],
      "removes one": [
        [{id:1, text:"moo"},{id:2, text:"boo"}],
        [{id:1, text:"moo"}],
        {$update: {}, ids: [1]}
      ],
      "reorder": [
        [{id:1, text:"moo"},{id:2, text:"boo"}],
        [{id:2, text:"boo"},{id:1, text:"moo"}],
        {$update: {}, ids: [2,1]}
      ],
      "update": [
        [{id:1, text:"moo"},{id:2, text:"boo"}],
        [{id:1, text:"moo"},{id:2, text:"moo and boo"}],
        {$update: {2: {text: "moo and boo"}}}
      ],
      "update and reorder": [
        [{id:1, text:"moo"},{id:2, text:"boo"}],
        [{id:2, text:"moo and boo"},{id:1, text:"moo"}],
        {$update: {2: {text: "moo and boo"}}, ids: [2,1]}
      ]
    }
  },
  objects: {
    "throws on invalid type": () => {
      expect(() => makeDiff("woah", {})).toThrow()
    },
    "set nested": [
      {moo: {boo: {zoo: 1, test: "words"}}},
      {moo: {boo: {zoo: 2, test: "words"}}},
      {moo: {boo: {zoo: 2}}}
    ],
    "add property": [
      {unchanged: "moo"},
      {unchanged: "moo", added: "boo"},
      {added: "boo"}
    ],
    "rm property": [
      {unchanged: "moo", toRemove: 123},
      {unchanged: "moo"},
      {toRemove: {$remove: true}}
    ]
  }
})

function runDiffTests(tests) {
  _.forOwn(tests, (test, key) => {
    if (_.isFunction(test)) {
      it(key, test)
    } else if (_.isArray(test)) {
      const [before, after, diff] = test
      const result = makeDiff(before, after)

      describe(`(${key})`, () => {
        it("diff", () => {
          expect(result).toEqual(diff)
        })
        if (result != IS_UNCHANGED) {
          it("merge", () => {
            const mergedBack = mergeDiff(before, result)
            expect(mergedBack).toEqual(after)
          })
        }
      })
    } else if (_.isObject(test)) {
      describe(`${key}:`, () => runDiffTests(test))
    }
  })
}
