# transdurex

A simple library for effortless conversion of map-filter-reduce chains into single-pass transducers.

A transducer is a higher-order reducer. You can find a brief introduction to transducers [here](https://clojure.org/reference/transducers).

## Motivation

Consider the following code snippet:

```javascript
function add1(v) {
  return v + 1;
}

function isOdd(v) {
  return v % 2;
}

function double(v) {
  return v * 2;
}

function sum(total, v) {
  return total + v;
}

var result = [1, 2, 3, 4, 5].map(add1).filter(isOdd).map(double).reduce(sum, 0);
```

This works fine. However, these transformations occur across multiple intermediate collections, which must be created, transformed, and subsequently garbage-collected once they are no longer needed.

A transducer enables you to perform these transformations in a single-pass without compromising the clarity of having those four distinct transformation functions.

Reducers have incompatible shapes with predicates, mappers, and other reducers, which means they cannot be directly composed together. To address this, the library provides utilities for converting mappers and predicates into reducers, allowing for seamless composition:

```javascript
var result = [1, 2, 3, 4, 5].reduce(
  transducer(mapReducer(add1), filterReducer(isOdd), mapReducer(double))(sum),
  0
);
```

You can express transduction in a more composable way by using the `transduce` function:

```javascript
var result = transduce(
  transducer(mapReducer(add1), filterReducer(isOdd), mapReducer(double))
)(sum)(0)([1, 2, 3, 4, 5]);
```

## Exported functions

- `mapReducer(mappingFn)` - creates a reducer from a mapper;
- `filterReducer(predicateFn)` - creates a reducer from a predicate;
- `transducer(...fns)` - combines multiple reducers into a transducer;
- `transduce(transducer)(combinerFn)(initialValue)(arr)` - transduces an array using the provided transducer, combiner function, initial value, and the array.
