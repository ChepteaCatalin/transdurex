import {mapReducer} from '../src/transdurex';

describe('mapReducer', () => {
  test('should return a reducer function', () => {
    var reducer = mapReducer(vi.fn());

    expect(typeof reducer).toBe('function');
  });

  test('should correctly apply the mapping and combine functions', () => {
    var incrementer = x => x + 1;
    var sumCombiner = (acc, curr) => acc + curr;

    var sum = [1, 2, 3, 4, 5].reduce(mapReducer(incrementer)(sumCombiner), 0);

    // [2, 3, 4, 5, 6] => 2 + 3 + 4 + 5 + 6 = 20
    expect(sum).toBe(20);
  });
});
