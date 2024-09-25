import {transducer} from '../src/transdurex';

describe('transducer', () => {
  test('returns a function', () =>
    expect(typeof transducer(vi.fn())).toBe('function'));

  test('works with a single function', () => {
    var composedFn = transducer(Math.sqrt);
    const initial = 10;

    const expectedOutput = Math.sqrt(initial);

    expect(composedFn(initial)).toBe(expectedOutput);
  });

  test('works with no functions', () => {
    const input = 10;

    expect(transducer(input)).toBe(input);
  });

  test('handles variadic arguments', () => {
    var sum = (...nums) => nums.reduce((total, num) => total + num, 0);
    var composedFn = transducer(sum, Math.sqrt);
    var input = [1, 2, 3, 4];

    var output = Math.sqrt(sum(input));

    expect(composedFn(input)).toBe(output);
  });

  test('handles complex function compositions', () => {
    var add = (a, b) => a + b;
    var multiplyBy2 = num => num * 2;
    var subtractBy5 = num => num - 5;
    var composedFn = transducer(
      add,
      multiplyBy2,
      subtractBy5,
      Math.sqrt,
      multiplyBy2
    );
    const initial = 10;

    const expectedOutput = multiplyBy2(
      Math.sqrt(subtractBy5(multiplyBy2(add(10))))
    );

    expect(composedFn(initial)).toBe(expectedOutput);
  });
});
