import {mapReducer} from '../src/transducer';

describe('mapReducer', () => {
  test('should return a reducer function', () => {
    var reducer = mapReducer(jest.fn());

    expect(typeof reducer).toBe('function');
  });

  test('should correctly apply the mapping and combine functions', () => {
    var incrementer = x => x + 1;
    var sumCombiner = (acc, curr) => acc + curr;

    var sum = [1, 2, 3, 4, 5].reduce(mapReducer(incrementer)(sumCombiner), 0);

    expect(sum).toBe(20); //2+3+4+5+6=20
  });
});
