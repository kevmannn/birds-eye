# birds-eye

> obj with nesting → collection containing all primitive value types and corresponding nest depths


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
    ba: 4
  },
  c: {
    ca: 22,
    cb: {
      cba: 4
    }
  },
  d: {
    e: Math.E,
    f: (n) => n * n,
    g: {},
    h: {
      i: true,
      j: false,
      k: [],
      l: {
        i: {
          n: {
            w: {
              a: {
                r: 'd'
              }
            }
          }
        },
        p: null
      },
      q: 42
    }
  },
  r: true
}
```

overview of nested structure of primitives:
```js
console.log(birdsEye(obj).structure);
// => 
[ { type: 'number', depth: 0 },
  { type: 'number', depth: 1 },
  { type: 'number', depth: 1 },
  { type: 'number', depth: 2 },
  { type: 'number', depth: 1 },
  { type: 'boolean', depth: 2 },
  { type: 'boolean', depth: 2 },
  { type: 'string', depth: 7 },
  { type: 'null', depth: 4 },
  { type: 'number', depth: 3 },
  { type: 'boolean', depth: 1 } ]
```

return all primitive types found at a given nest depth:
```js
console.log(birdsEye(obj).atDepth(1)); // => ['number', 'number', 'number', 'boolean']
console.log(birdsEye(obj).atDepth(7)); // => ['string']
console.log(birdsEye(obj).atDepth(42)); // => []
```
