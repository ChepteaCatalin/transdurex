import {transducer} from '../src/transdurex';

var square = num => num * num;

describe('transducer', () => {
  test('should return a function', () => {
    var result = transducer(jest.fn());

    expect(typeof result).toBe('function');
  });

  test('should work with single function', () => {
    var composedFn = transducer(square);
    const initial = 10;

    const expectedOutput = square(initial);

    expect(composedFn(initial)).toBe(expectedOutput);
  });

  test('should work with no functions', () => {
    const input = 10;

    expect(transducer(input)).toBe(input);
  });

  test('should handle variadic arguments', () => {
    var sum = (...nums) => nums.reduce((total, num) => total + num, 0);
    var composedFn = transducer(sum, square);
    var input = [1, 2, 3, 4];

    var output = square(sum(input));

    expect(composedFn(input)).toBe(output);
  });

  test('should handle complex function compositions', () => {
    var add = (a, b) => a + b;
    var multiplyBy2 = num => num * 2;
    var subtractBy5 = num => num - 5;
    var composedFn = transducer(
      add,
      multiplyBy2,
      subtractBy5,
      square,
      multiplyBy2
    );
    const initial = 10;

    const expectedOutput = multiplyBy2(
      square(subtractBy5(multiplyBy2(add(10))))
    );

    expect(composedFn(initial)).toBe(expectedOutput);
  });
});
