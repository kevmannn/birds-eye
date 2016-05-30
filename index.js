'use strict';
const _ = require('lodash');
const isPrimitive = require('is-primitive');

const gate = (v, fn) => isPrimitive(v) ? v === null ? null + '' : typeof value : fn(v);

module.exports = value => gate(value, mapTypeStructure);

module.exports.atDepth = (value, n) => {
  return gate(value, v => {
    return mapTypeStructure(v)
      .filter(o => o.depth === n)
      .map(o => o.type)
  })
}

function mapTypeStructure(obj, memo, depth, isEnd) {
  const nonObj = v => isPrimitive(v) || typeof v === 'function';

  memo = memo || [];
  depth = depth || 0;

  _.forEach(obj, v => {
    const type = v === null ? null + '' : typeof v;

    // if (isEnd && depth > 0) depth--;
    if (isPrimitive(v)) memo.push({ type, depth });
    else if (!nonObj(v)) mapTypeStructure(v, memo, ++depth, isEnd);
  })

  return memo;
}
