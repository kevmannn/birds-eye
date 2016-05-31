'use strict';
const _ = require('lodash');
const isPrimitive = require('is-primitive');

const gate = (v, fn) => isPrimitive(v) ? v === null ? null + '' : typeof value : fn(v);
const isObj = v => !isPrimitive(v) && typeof v !== 'function';

module.exports = obj => gate(obj, mapTypeStructure);

module.exports.atDepth = (obj, n) => {
  return gate(obj, o => {
    return mapTypeStructure(o)
      .filter(o => o.depth === n)
      .map(o => o.type)
  })
}

function mapTypeStructure(obj, structure, currentDepth) {
  structure = structure || [];
  currentDepth = currentDepth || 0;

  _.forEach(obj, (v, i) => {
    const type = v === null ? null + '' : typeof v;

    if (v === obj[Object.keys(obj) - 1]) currentDepth--;

    if (isObj(v) && Object.keys(v).length) {
      mapTypeStructure(v, structure, ++currentDepth);
    } else if (isPrimitive(v)) {
      structure.push({ type, currentDepth });
    }
  })

  return structure;
}
