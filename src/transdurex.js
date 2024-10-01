export function mapReducer(mapper) {
  return combiner => (acc, curr) => combiner(acc, mapper(curr));
}

export function filterReducer(predicate) {
  return combiner => (acc, curr) => predicate(curr) ? combiner(acc, curr) : acc;
}

export function transducer(...fns) {
  return fns.reduce(
    (pipe, fn) =>
      (...args) =>
        pipe(fn(...args))
  );
}

export function transduce(transducer) {
  return combiner => initialValue => arr =>
    arr.reduce(transducer(combiner), initialValue);
}
