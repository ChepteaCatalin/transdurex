export function mapReducer(mappingFn) {
  return (combineFn) =>
    function reducer(acc, curr) {
      return combineFn(acc, mappingFn(curr));
    };
}

export function filterReducer(predicateFn) {
  return (combineFn) =>
    function reducer(acc, curr) {
      if (predicateFn(curr)) return combineFn(acc, curr);
      return acc;
    };
}

export function transducer(...fns) {
  return fns.reduce(
    (composed, fn) =>
      (...args) =>
        composed(fn(...args))
  );
}
