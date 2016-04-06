'use strict';
const isPrimitive = require('is-primitive');

// TODO: git push, npm publish, travis ci
module.exports = function (value) {

  if (isPrimitive(value)) return { structure: [typeof value] };

  const mapTypeStructure = (obj, context, depth) => {

    context = context || [];
    depth = depth || 0;

    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {

        if (!isPrimitive(obj[k]) && !Object.keys(obj[k]).length) continue;

        if (!isPrimitive(obj[k]) && typeof obj[k] !== 'function') {
          mapTypeStructure(obj[k], context, ++depth);
        } else if (isPrimitive(obj[k])) {
          const type = obj[k] === null ? null : typeof obj[k];
          context.push({ type, depth });
        }
      }
    }

    return { context }
  }

  const atDepth = n =>  {
    return mapTypeStructure(value).context
      .filter(obj => obj.depth === n)
      .map(obj => obj.type)
  }

  return { structure: mapTypeStructure(value).context, atDepth }
}
