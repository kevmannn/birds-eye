import test from 'ava';
import birdsEye from './';

const o = {
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
}
const oStructure = 
[ { type: 'number', depth: 0 },
  { type: 'boolean', depth: 1 },
  { type: 'string', depth: 4 },
  { type: 'null', depth: 2 },
  { type: 'number', depth: 0 } ]

const a = [2,[42,[[[true]]],'n',[1e6]], undefined];
const aStructure = 
[ { type: 'number', depth: 0 },
  { type: 'number', depth: 1 },
  { type: 'boolean', depth: 4 },
  { type: 'string', depth: 1 },
  { type: 'number', depth: 2 },
  { type: 'undefined', depth: 0 } ]

test('.structure', t => {
  t.deepEqual(birdsEye(o).structure, oStructure);
  t.deepEqual(birdsEye(a).structure, aStructure);
})

test('.structure for flat inputs', t => {
  t.deepEqual(birdsEye(42).structure, ['number']);
  t.deepEqual(birdsEye('x').structure, ['string']);
  t.deepEqual(birdsEye(true).structure, ['boolean']);
  t.deepEqual(birdsEye(null).structure, ['null']);
  t.deepEqual(birdsEye(undefined).structure, ['undefined']);
  t.deepEqual(birdsEye((n) => Math.sqrt(n)).structure, []);
  t.deepEqual(birdsEye({}).structure, []);
})

test('.atDepth()', t => {
  t.deepEqual(birdsEye(o).atDepth(0), ['number', 'number']);
  t.deepEqual(birdsEye(o).atDepth(2), ['null']);
  t.deepEqual(birdsEye(o).atDepth(4), ['string']);
  t.deepEqual(birdsEye(o).atDepth(5), []);
  t.deepEqual(birdsEye(o).atDepth(1.2), []);
  t.deepEqual(birdsEye(o).atDepth(-2), []);
  t.deepEqual(birdsEye(o).atDepth(+Infinity), []);
  t.deepEqual(birdsEye(o).atDepth(-Infinity), []);

  t.deepEqual(birdsEye(a).atDepth(0), ['number', 'undefined']);
  t.deepEqual(birdsEye(a).atDepth(1), ['number', 'string']);
  t.deepEqual(birdsEye(a).atDepth(0.1), []);
  t.deepEqual(birdsEye(a).atDepth(false), []);
  t.deepEqual(birdsEye(a).atDepth('x'), []);
})
