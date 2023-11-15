/**
 * Transforms a mapping function into a reducer
 *
 * @param {Function} mapper the mapping function to convert
 * @returns {Function} reducer function
 */
function mapReducer(mapper) {
  return combineFn =>
    function reducer(acc, curr) {
      return combineFn(acc, mapper(curr));
    };
}

/**
 * Transforms a predicate into a reducer
 *
 * @param {Function} predicate the predicate to convert
 * @returns {Function} reducer function
 */
function filterReducer(predicate) {
  return combineFn =>
    function reducer(acc, curr) {
      if (predicate(curr)) return combineFn(acc, curr);
      return acc;
    };
}

/**
 * Creates a transducer by piping multiple reducer functions
 *
 * @param {Function[]} fns the reducers functions to pipe
 * @returns {Function} transducer function
 */
function transducer(...fns) {
  return fns.reduce(
    (pipe, fn) =>
      (...args) =>
        pipe(fn(...args))
  );
}

/**
 * Transduces an array using the provided transducer, combiner and the initial value
 *
 * @curried
 * @param {Function} transducer
 * @param {Function} combiner
 * @param {*} initialValue
 * @param {Array} arr
 * @returns {*} accumulated value
 */
function transduce(transducer) {
  return combiner => initialValue => arr =>
    arr.reduce(transducer(combiner), initialValue);
}

export {mapReducer, filterReducer, transducer, transduce};
