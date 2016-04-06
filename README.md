# birds-eye

> nested obj → array of flat objs with primitive value type and nest depth in original obj


## Install

```console
npm install --save birds-eye
```

## Usage

nested object:
```js
const obj = {
  num: 42,
  q: {
    name: 4
  },
  parent: {
    once: 'once',
    twice: '22',
    thrice: {},
    fourTimes: {
      bool: true,
      m: null,
      n: {},
      o: {
        p: 42,
        q: {
          r: undefined
        }
      },
      s: 42
    }
  },
  t: true
}
```

overview of nested structure:
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

return all types found at a given nest depth:
```js
console.log(birdsEye(obj).atDepth(2)); // => ['string', 'string', 'boolean']
console.log(birdsEye(obj).atDepth(4)); // => ['number', 'number']
```
