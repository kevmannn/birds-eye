# birds-eye

> nested obj → collection containing all primitive value types and corresponding nest depth


## Install

```console
npm install --save birds-eye
```

## Usage

object with nesting:
```js
const obj = {
  a: 42,
  b: {
    c: 4
  },
  d: {
    e: 'once',
    f: '22',
    g: {},
    h: {
      i: true,
      j: null,
      k: {},
      l: {
        m: 42,
        n: {
          o: undefined
        }
      },
      p: 42
    }
  },
  q: true
}
```

overview of nested structure of primitives:
```js
console.log(birdsEye(obj).structure);
// => 
[ { type: 'number', depth: 0 },
  { type: 'number', depth: 1 },
  { type: 'string', depth: 2 },
  { type: 'string', depth: 2 },
  { type: 'boolean', depth: 3 },
  { type: null, depth: 3 },
  { type: 'number', depth: 4 },
  { type: 'undefined', depth: 5 },
  { type: 'number', depth: 4 },
  { type: 'boolean', depth: 2 } ];
```

return all primitive types found at a given nest depth:
```js
console.log(birdsEye(obj).atDepth(2)); // => ['string', 'string', 'boolean']
console.log(birdsEye(obj).atDepth(4)); // => ['number', 'number']
console.log(birdsEye(obj).atDepth(42)); // => []
```
