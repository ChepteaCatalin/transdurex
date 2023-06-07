/**
 * Converts a mapping function into a reducer
 *
 * @template T, R
 * @param {function(T): R} mappingFn the mapping function to convert
 * @returns {function(function(A, R): A): function(A, T): A}  the resulting reducer function
 */
export function mapReducer(mappingFn) {
  /**
   * Combines the accumulated value with the mapped value using the combine function
   *
   * @template A, T, R
   * @param {function(A, R): A} combineFn the combiner function
   * @returns {function(A, T): A} the reducer function
   */
  return (combineFn) =>
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
export function filterReducer(predicateFn) {
  /**
   * Combines the accumulated value with the current value if the predicate function returns true
   *
   * @template A, T
   * @param {function(A, T): A} combineFn the combiner function
   * @returns {function(A, T): A} the reducer function
   */
  return (combineFn) =>
    function reducer(acc, curr) {
      if (predicateFn(curr)) return combineFn(acc, curr);
      return acc;
    };
}

/**
 * Composes multiple reducers functions into a single transducer
 *
 * @template T
 * @param {...function} fns - the reducers functions to compose
 * @returns {function(...T[]): T[]} - the resulting transducer function
 */
export function transducer(...fns) {
  /**
   * Composes the given reducers functions into a single transducer
   *
   * @param {...T} args the arguments to pass through the transducer
   * @returns {T[]} the transformed output
   */
  return fns.reduce(
    (composed, fn) =>
      (...args) =>
        composed(fn(...args))
  );
}
