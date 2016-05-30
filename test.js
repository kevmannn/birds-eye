import test from 'ava';
import map from './map';
import fn from './';

const values = [true, 42, 'x', undefined, null];
const primitives = values.map(v => v === null ? null + '' : typeof v);

test.failing('fn maps correct type and depth structure', t => {
  // console.log(fn(map.o.in));
  // console.log('\n\n');
  // console.log(map.o.out);

  t.deepEqual(fn(map.o.in), map.o.out);
  t.deepEqual(fn(map.a.in), map.a.out);
})

test.failing('fn returns correct type on flat input', t => {
  primitives.forEach((type, i) => t.deepEqual(fn(values[i]), type));
})

// test.skip('fn returns types for flat inputs', t => {
//   t.deepEqual(fn(42), ['number']);
//   t.deepEqual(fn('x'), ['string']);
//   t.deepEqual(fn(true), ['boolean']);
//   t.deepEqual(fn(null), ['null']);
//   t.deepEqual(fn(undefined), ['undefined']);
//   t.deepEqual(fn((n) => Math.sqrt(n)), []);
//   t.deepEqual(fn({}), []);
// })

// test.skip('.atDepth() lists types at given depth', t => {
//   t.deepEqual(fn(map.o.in).atDepth(0), ['number', 'number']);
//   t.deepEqual(fn(map.o.in).atDepth(2), ['null']);
//   t.deepEqual(fn(map.o.in).atDepth(4), ['string']);
//   t.deepEqual(fn(map.o.in).atDepth(5), []);
//   t.deepEqual(fn(map.o.in).atDepth(1.2), []);
//   t.deepEqual(fn(map.o.in).atDepth(-2), []);
//   t.deepEqual(fn(map.o.in).atDepth(+Infinity), []);
//   t.deepEqual(fn(map.o.in).atDepth(-Infinity), []);

//   t.deepEqual(fn(map.a.in).atDepth(0), ['number', 'undefined']);
//   t.deepEqual(fn(map.a.in).atDepth(1), ['number', 'string']);
//   t.deepEqual(fn(map.a.in).atDepth(0.1), []);
//   t.deepEqual(fn(map.a.in).atDepth(false), []);
//   t.deepEqual(fn(map.a.in).atDepth('x'), []);
// })
