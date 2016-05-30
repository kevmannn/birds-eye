import test from 'ava';
import _ from 'lodash';
import map from './map';
import fn from './';

const values = [true, 42, 'x', undefined, null];
const primitives = values.map(v => v === null ? null + '' : typeof v);

console.log(fn(map.o.in));
console.log('\n\n');
console.log(map.o.out);

test.failing('fn maps correct type and depth structure', t => {
  t.deepEqual(fn(map.o.in), map.o.out);
  t.deepEqual(fn(map.a.in), map.a.out);
})

test.failing('fn returns correct type on flat input', t => {
  values.forEach((v, i) => t.is(fn(v), primitives[i]));
  // t.deepEqual(fn((n) => Math.sqrt(n)), []);
  // t.deepEqual(fn({}), []);
})

// test.failing('.atDepth() returns correct types at depth n', t => {
//   t.deepEqual(fn(map.o.in).atDepth(0), ['number', 'number']);
//   t.deepEqual(fn(map.o.in).atDepth(1.2), []);
//   t.deepEqual(fn(map.o.in).atDepth(-2), []);
//   t.deepEqual(fn(map.o.in).atDepth(+Infinity), []);

//   t.deepEqual(fn(map.a.in).atDepth(0), ['number', 'undefined']);
//   t.deepEqual(fn(map.a.in).atDepth(0.1), []);
//   t.deepEqual(fn(map.a.in).atDepth('x'), []);
// })
