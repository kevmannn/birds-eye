import _ from 'lodash';
import test from 'ava';
import map from './map';
import fn from './';
import { atDepth } from './';

const values = [true, 42, 'x', undefined, null];
const primitives = values.map(v => v === null ? null + '' : typeof v);
const objInput = map.obj.in;
const arrInput = map.arr.in;

test('fn maps correct primitive type and depth structure', t => {
  const mapIntegrity = m => _.includes(m.map(p => p.type), 'string');

  t.truthy(mapIntegrity(map.obj.out));

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
