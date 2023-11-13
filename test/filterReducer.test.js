import {filterReducer} from '../src/transdurex';

describe('filterReducer', () => {
  test('should return a reducer function', () => {
    var reducer = filterReducer(jest.fn());

    expect(typeof reducer).toBe('function');
  });

  test('should correctly apply the filtering and combine functions', () => {
    var isEven = x => !(x % 2);
    var sumCombiner = (acc, curr) => acc + curr;

    var result = [1, 2, 63, 13, 4, 51, 6, 8, 11, 13, 10, 0, 12].reduce(
      filterReducer(isEven)(sumCombiner),
      0
    ); //2+4+6+8+10+12=42

    expect(result).toBe(42);
  });
});
