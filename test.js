import test from 'ava';
import birdsEye from './';

const objOne = {
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

const structureOne = 
[ { type: 'number', depth: 0 },
  { type: 'number', depth: 1 },
  { type: 'number', depth: 2 },
  { type: 'number', depth: 1 },
  { type: 'boolean', depth: 2 },
  { type: 'string', depth: 5 },
  { type: null, depth: 3 },
  { type: 'number', depth: 2 },
  { type: 'boolean', depth: 0 } ]

test('structure', t => {
  t.deepEqual(birdsEye(objOne).structure, structureOne);
  t.deepEqual(birdsEye(42).structure, ['number']);
  t.deepEqual(birdsEye('x').structure, ['string']);
  t.deepEqual(birdsEye(true).structure, ['boolean']);
  t.deepEqual(birdsEye(null).structure, [null]);
  t.deepEqual(birdsEye(undefined).structure, ['undefined']);
  t.deepEqual(birdsEye((n) => Math.sqrt(n)).structure, []);
})

test('atDepth', t => {
  t.deepEqual(birdsEye(objOne).atDepth(0), ['number', 'boolean']);
  t.deepEqual(birdsEye(objOne).atDepth(1), ['number', 'number']);
  t.deepEqual(birdsEye(objOne).atDepth(2), ['number', 'boolean', 'number']);
  t.deepEqual(birdsEye(objOne).atDepth(4), []);
  t.deepEqual(birdsEye(objOne).atDepth(5), ['string']);
  t.deepEqual(birdsEye(objOne).atDepth(100), []);
  t.deepEqual(birdsEye(objOne).atDepth(1.2), []);
  t.deepEqual(birdsEye(objOne).atDepth(-2), []);
  t.deepEqual(birdsEye(objOne).atDepth(+Infinity), []);
  t.deepEqual(birdsEye(objOne).atDepth(-Infinity), []);
})
