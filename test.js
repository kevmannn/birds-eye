import test from 'ava';
import birdsEye from './';

const obj = {
  a: 42,
  b: {},
  c: {
    d: 22,
    e: {
      f: 4
    }
  },
  g: {
    h: Math.E,
    i: (n) => n * n,
    j: {},
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
      },
      s: 42
    }
  },
  t: true
}

const out = 
[ { type: 'number', depth: 0 },
  { type: 'number', depth: 1 },
  { type: 'number', depth: 2 },
  { type: 'number', depth: 1 },
  { type: 'boolean', depth: 2 },
  { type: 'string', depth: 5 },
  { type: 'null', depth: 4 },
  { type: 'number', depth: 3 },
  { type: 'boolean', depth: 1 } ]

test('structure', t => {
  t.deepEqual(birdsEye(obj).structure, out);
  t.deepEqual(birdsEye(42).structure, ['number']);
  t.deepEqual(birdsEye('x').structure, ['string']);
  t.deepEqual(birdsEye(true).structure, ['boolean']);
  t.deepEqual(birdsEye(undefined).structure, ['undefined']);
  t.deepEqual(birdsEye((n) => Math.sqrt(n)).structure, []);
})

test('atDepth', t => {
  t.deepEqual(birdsEye(obj).atDepth(0), ['number']);
  t.deepEqual(birdsEye(obj).atDepth(1), ['number', 'number', 'boolean']);
  t.deepEqual(birdsEye(obj).atDepth(2), ['number', 'boolean']);
  t.deepEqual(birdsEye(obj).atDepth(4), ['null']);
  t.deepEqual(birdsEye(obj).atDepth(5), ['string']);
  t.deepEqual(birdsEye(obj).atDepth(100), []);
  t.deepEqual(birdsEye(obj).atDepth(1.2), []);
  t.deepEqual(birdsEye(obj).atDepth(+Infinity), []);
  t.deepEqual(birdsEye(obj).atDepth(-Infinity), []);
})
