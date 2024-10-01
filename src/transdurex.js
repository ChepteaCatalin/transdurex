export const mapReducer = mapper => combiner => (acc, curr) =>
  combiner(acc, mapper(curr));

export const filterReducer = predicate => combiner => (acc, curr) =>
  predicate(curr) ? combiner(acc, curr) : acc;

export const transducer = (...fns) =>
  fns.reduce(
    (pipe, fn) =>
      (...args) =>
        pipe(fn(...args))
  );

export const transduce = transducer => combiner => initialValue => arr =>
  arr.reduce(transducer(combiner), initialValue);
