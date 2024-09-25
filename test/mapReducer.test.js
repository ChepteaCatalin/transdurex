import {mapReducer} from '../src/transdurex';

describe('mapReducer', () => {
  test('returns a reducer function', () =>
    expect(typeof mapReducer(vi.fn())).toBe('function'));

  test('correctly applies the mapping and combine functions', () => {
    var increment = x => ++x;
    var sumCombiner = (acc, curr) => acc + curr;

    var sum = [1, 2, 3, 4, 5].reduce(mapReducer(increment)(sumCombiner), 0);

    // [2, 3, 4, 5, 6] => 2 + 3 + 4 + 5 + 6 = 20
    expect(sum).toBe(20);
  });
});
