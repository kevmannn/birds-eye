import test from 'ava';
import birdsEye from './';

const obj = {
  a: 42,
  b: {
    ba: 4
  },
  c: {
    ca: 22,
    cb: {
      cba: 4
    }
  },
  d: {
    e: Math.E,
    f: (n) => n * n,
    g: {},
    h: {
      i: true,
      j: false,
      k: [],
      l: {
        i: {
          n: {
            w: {
              a: {
                r: 'd'
              }
            }
          }
        },
        p: null
      },
      q: 42
    }
  },
  r: true
}

const out = 
[ { type: 'number', depth: 0 },
  { type: 'number', depth: 1 },
  { type: 'number', depth: 1 },
  { type: 'number', depth: 2 },
  { type: 'number', depth: 1 },
  { type: 'boolean', depth: 2 },
  { type: 'boolean', depth: 2 },
  { type: 'string', depth: 7 },
  { type: 'null', depth: 4 },
  { type: 'number', depth: 3 },
  { type: 'boolean', depth: 1 } ]

test('structure', t => {
  t.same(birdsEye(obj).structure, out);
  t.same(birdsEye(42).structure, ['number']);
  t.same(birdsEye('x').structure, ['string']);
  t.same(birdsEye(true).structure, ['boolean']);
  t.same(birdsEye(undefined).structure, ['undefined']);
})

test('atDepth', t => {
  t.same(birdsEye(obj).atDepth(0), ['number']);
  t.same(birdsEye(obj).atDepth(1), ['number', 'number', 'number', 'boolean']);
  t.same(birdsEye(obj).atDepth(4), ['null']);
  t.same(birdsEye(obj).atDepth(5), []);
  t.same(birdsEye(obj).atDepth(7), ['string']);
  t.same(birdsEye(obj).atDepth(100), []);
})
