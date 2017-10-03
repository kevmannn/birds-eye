import test from 'ava';
import includes from 'lodash/includes';

import fn from './';
import map from './map';
import { atDepth } from './';

const values = [true, 42, 'x', null, undefined];
const primitives = values.map(v => v === null ? null + '' : typeof v);
const objInput = map.obj.in;
const arrInput = map.arr.in;

test('fn maps correct primitive type and depth structure', t => {
  const mapIntegrity = m => primitives.slice(0, -1).every(p => includes(m.map(o => o.type), p));

  t.true(mapIntegrity(map.obj.out));

  t.deepEqual(fn(objInput), map.obj.out);
  t.deepEqual(fn(arrInput), map.arr.out);
})

test('fn returns correct type on flat input', t => {
  values.forEach((v, i) => t.is(fn(v), primitives[i]));
  t.deepEqual(fn(n => Math.sqrt(n)), []);
})

test('.atDepth() returns correct type on flat input', t => {
  values.forEach((v, i) => t.is(atDepth(v, 1), primitives[i]));
})

test('.atDepth() returns correct types at depth n', t => {
  t.deepEqual(atDepth(objInput, 0), ['number', 'number']);
  t.deepEqual(atDepth(objInput, -1), []);
  t.deepEqual(atDepth(objInput, Infinity), []);

  t.deepEqual(atDepth(arrInput, 0), ['number', 'undefined']);
})
