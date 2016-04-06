import test from 'ava';
import birdsEye from './';

const obj = {
  num: 42,
  q: {
    name: 4
  },
  parent: {
    once: 'once',
    twice: '22',
    thrice: {},
    fourTimes: {
      bool: true,
      m: null,
      n: {},
      o: {
        p: 42,
        q: {
          r: undefined
        }
      },
      s: 42
    }
  },
  t: true
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
})
