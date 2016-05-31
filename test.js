import test from 'ava';
import _ from 'lodash';
import map from './map';
import fn from './';
import { atDepth } from './';

const values = [true, 42, 'x', undefined, null];
const primitives = values.map(v => v === null ? null + '' : typeof v);

test('fn maps correct type and depth structure', t => {
  t.deepEqual(fn(map.o.in), map.o.out);
  t.deepEqual(fn(map.a.in), map.a.out);
})

test('fn returns correct type on flat input', t => {
  values.forEach((v, i) => t.is(fn(v), primitives[i]));
  t.deepEqual(fn((n) => Math.sqrt(n)), []);
})

test('.atDepth() returns correct type on flat input', t => {
  values.forEach((v, i) => t.is(atDepth(v, 1), primitives[i]));
})

test('.atDepth() returns correct types at depth n', t => {
  const objInput = map.o.in;
  const arrInput = map.a.in;

  t.deepEqual(atDepth(objInput, 0), ['number', 'number']);
  t.deepEqual(atDepth(objInput, -1), []);
  t.deepEqual(atDepth(objInput, Infinity), []);

  t.deepEqual(atDepth(arrInput, 0), ['number', 'undefined']);
})
