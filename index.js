'use strict';
const _ = require('lodash');
const isPrimitive = require('is-primitive');

const gate = (v, fn) => isPrimitive(v) ? v === null ? null + '' : typeof value : fn(v);
const nonObj = v => isPrimitive(v) || typeof v === 'function';

module.exports = value => gate(value, mapTypeStructure);

module.exports.atDepth = (value, n) => {
  return gate(value, v => {
    return mapTypeStructure(v)
      .filter(o => o.depth === n)
      .map(o => o.type)
  })
}

function mapTypeStructure(obj, structure, depth) {
  structure = structure || [];
  depth = depth || 0;

  _.forEach(obj, (v, i) => {
    const type = v === null ? null + '' : typeof v;
    console.log(v, obj[i + 1]);

    // if (obj[i + 1] === 'undefined') depth--;
    if (!nonObj(v)) mapTypeStructure(v, structure, ++depth);
    else if (isPrimitive(v)) structure.push({ type, depth });
  })

  return structure;
}
