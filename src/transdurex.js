/**
 * Converts a mapping function into a reducer
 *
 * @template T, R
 * @param {function(T): R} mappingFn the mapping function to convert
 * @returns {function(function(A, R): A): function(A, T): A}  the resulting reducer function
 */
function mapReducer(mappingFn) {
  return combineFn =>
    function reducer(acc, curr) {
      return combineFn(acc, mappingFn(curr));
    };
}

/**
 * Converts a predicate function into a reducer
 *
 * @template T
 * @param {function(T): boolean} predicateFn the predicate function to convert
 * @returns {function(function(A, T): A): function(A, T): A} the resulting reducer function
 */
function filterReducer(predicateFn) {
  return combineFn =>
    function reducer(acc, curr) {
      if (predicateFn(curr)) return combineFn(acc, curr);
      return acc;
    };
}

/**
 * Creates a transducer by piping multiple reducer functions.
 *
 * @template T
 * @param {...function} fns - the reducers functions to pipe
 * @returns {function(...T[]): T[]} - the resulting transducer function
 */
function transducer(...fns) {
  return fns.reduce(
    (pipe, fn) =>
      (...args) =>
        pipe(fn(...args))
  );
}

export {mapReducer, filterReducer, transducer};
