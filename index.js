'use strict';
const isPrimitive = require('is-primitive');

module.exports = function (value) {

  if (isPrimitive(value)) return { structure: [typeof value] };

  let endOfObj = null;
  const mapTypeStructure = (obj, context, depth) => {

    const currentKeys = Object.keys(obj);

    context = context || [];
    depth = depth || 0;

    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {

        if (endOfObj && depth > 0) depth--;

        if (!isPrimitive(obj[k]) && !Object.keys(obj[k]).length) continue;

        if (!isPrimitive(obj[k]) && typeof obj[k] !== 'function') {
          
          endOfObj = false;
          mapTypeStructure(obj[k], context, ++depth);
        } else if (isPrimitive(obj[k])) {

          const type = obj[k] === null ? null : typeof obj[k];
          endOfObj = k === currentKeys[currentKeys.length - 1];
          context.push({
            type: type + '',
            depth: depth
          })
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
