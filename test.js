import test from 'ava';
import birdsEye from './';

const obj = {
  a: 42,
  b: {
    c: 4
  },
  d: {
    e: 'once',
    f: '22',
    g: {},
    h: {
      i: true,
      j: null,
      k: {},
      l: {
        m: 42,
        n: {
          o: undefined
        }
      },
      p: 42
    }
  },
  q: true
}

const out = 
[ { type: 'number', depth: 0 },
  { type: 'number', depth: 1 },
  { type: 'string', depth: 2 },
  { type: 'string', depth: 2 },
  { type: 'boolean', depth: 3 },
  { type: null, depth: 3 },
  { type: 'number', depth: 4 },
  { type: 'undefined', depth: 5 },
  { type: 'number', depth: 4 },
  { type: 'boolean', depth: 2 } ];

test('structure', t => {
  t.same(birdsEye(obj).structure, out);
})

test('atDepth', t => {
  t.same(birdsEye(obj).atDepth(0), ['number']);
  t.same(birdsEye(obj).atDepth(2), ['string', 'string', 'boolean']);
  t.same(birdsEye(obj).atDepth(3), ['boolean', null]);
  t.same(birdsEye(obj).atDepth(4), ['number', 'number']);
  t.same(birdsEye(obj).atDepth(5), ['undefined']);
  t.same(birdsEye(obj).atDepth(51), []);
})
