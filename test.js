import test from 'ava';
import fn from './';
import map from './fixtures/map.js';

test('.structure', t => {
  t.deepEqual(fn(map.o.in).structure, map.o.out);
  t.deepEqual(fn(map.a.in).structure, map.a.out);
})

test('.structure returns types for flat inputs', t => {
  t.deepEqual(fn(42).structure, ['number']);
  t.deepEqual(fn('x').structure, ['string']);
  t.deepEqual(fn(true).structure, ['boolean']);
  t.deepEqual(fn(null).structure, ['null']);
  t.deepEqual(fn(undefined).structure, ['undefined']);
  t.deepEqual(fn((n) => Math.sqrt(n)).structure, []);
  t.deepEqual(fn({}).structure, []);
})

test('.atDepth() lists types at given depth', t => {
  t.deepEqual(fn(map.o.in).atDepth(0), ['number', 'number']);
  t.deepEqual(fn(map.o.in).atDepth(2), ['null']);
  t.deepEqual(fn(map.o.in).atDepth(4), ['string']);
  t.deepEqual(fn(map.o.in).atDepth(5), []);
  t.deepEqual(fn(map.o.in).atDepth(1.2), []);
  t.deepEqual(fn(map.o.in).atDepth(-2), []);
  t.deepEqual(fn(map.o.in).atDepth(+Infinity), []);
  t.deepEqual(fn(map.o.in).atDepth(-Infinity), []);

  t.deepEqual(fn(map.a.in).atDepth(0), ['number', 'undefined']);
  t.deepEqual(fn(map.a.in).atDepth(1), ['number', 'string']);
  t.deepEqual(fn(map.a.in).atDepth(0.1), []);
  t.deepEqual(fn(map.a.in).atDepth(false), []);
  t.deepEqual(fn(map.a.in).atDepth('x'), []);
})
