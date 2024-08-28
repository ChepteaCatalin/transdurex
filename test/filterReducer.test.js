import {filterReducer} from '../src/transdurex';

describe('filterReducer', () => {
  test('should return a reducer function', () =>
    expect(typeof filterReducer(vi.fn())).toBe('function'));

  test('should correctly apply the filtering and combine functions', () => {
    var isEven = x => !(x % 2);
    var sumCombiner = (acc, curr) => acc + curr;

    var result = [1, 2, 63, 13, 4, 51, 6, 8, 11, 13, 10, 0, 12].reduce(
      filterReducer(isEven)(sumCombiner),
      0
    );

    // [1, 2, 63, 13, 4, 51, 6, 8, 11, 13, 10, 0, 12] => [2, 4, 6, 8, 10, 0, 12] => 2 + 4 + 6 + 8 + 10 + 0 + 12 = 42
    expect(result).toBe(42);
  });
});
