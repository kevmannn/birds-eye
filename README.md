# birds-eye

> obj with nesting → collection containing all primitive value types and corresponding nest depths

[![Build Status](https://travis-ci.org/kevmannn/birds-eye.svg?branch=master)](https://travis-ci.org/kevmannn/birds-eye)

## Install

```console
npm install --save birds-eye
```

## Usage

object with nesting:
```js
const obj = {
  i: Math.E,
  j: (n) => n * n,
  k: {
    l: true,
    m: [],
    n: {
      o: {
        p: {
          q: 'Q'
        }
      },
      r: null
    }
  },
  s: 42
}
```

overview of nested structure of primitives:
```js
console.log(birdsEye(obj).structure);
// => 
[ { type: 'number', depth: 0 },
  { type: 'boolean', depth: 1 },
  { type: 'string', depth: 4 },
  { type: 'null', depth: 2 },
  { type: 'number', depth: 0 } ]
```

return all primitive types found at a given nest depth:
```js
console.log(birdsEye(obj).atDepth(0)); // => ['number', 'number']
console.log(birdsEye(obj).atDepth(4)); // => ['string']
console.log(birdsEye(obj).atDepth(42)); // => []
```

this of course also works with nested arrays:
```js
const arr = [2,[42,[[[true]]],'n',[1e6]], undefined];
console.log(birdsEye(arr).structure);
// =>
[ { type: 'number', depth: 0 },
  { type: 'number', depth: 1 },
  { type: 'boolean', depth: 4 },
  { type: 'string', depth: 1 },
  { type: 'number', depth: 2 },
  { type: 'undefined', depth: 0 } ]
```

## License

MIT © [Kevin Donahue](https://twitter.com/recur_excur)
