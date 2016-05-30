'use strict';

module.exports.o = {
  in: {
    i: Math.E,
    j: (n) => n * n,
    k: {
      l: true,
      m: [],
      n: {
        o: {
          p: {
            q: 'Q'
          }
        },
        r: null
      }
    },
    s: 42
  },
  out:
  [ { type: 'number', depth: 0 },
    { type: 'boolean', depth: 1 },
    { type: 'string', depth: 4 },
    { type: 'null', depth: 2 },
    { type: 'number', depth: 0 } ]
}

module.exports.a = {
  in: [2,[42,[[[true]]],'n',[1e6]], undefined],
  out: 
  [ { type: 'number', depth: 0 },
    { type: 'number', depth: 1 },
    { type: 'boolean', depth: 4 },
    { type: 'string', depth: 1 },
    { type: 'number', depth: 2 },
    { type: 'undefined', depth: 0 } ]
}
