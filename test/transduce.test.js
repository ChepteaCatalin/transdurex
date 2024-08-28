import {
  mapReducer,
  filterReducer,
  transducer,
  transduce,
} from '../src/transdurex';

describe('transduce', () => {
  test('should transduce a list using the provided transducer and combiner function', () => {
    var add1 = v => ++v;
    var isOdd = v => !!(v % 2);
    var double = v => v * 2;
    var composedReducer = transducer(
      mapReducer(add1),
      filterReducer(isOdd),
      mapReducer(double)
    );
    var sum = (total, v) => total + v;
    const initialValue = 0;
    var arr = [1, 2, 3, 4, 5];

    var result = transduce(composedReducer)(sum)(initialValue)(arr);

    // [2, 3, 4, 5, 6] => [3, 5] => [6, 10] => 6 + 10 = 16
    expect(result).toBe(16);
  });
});
