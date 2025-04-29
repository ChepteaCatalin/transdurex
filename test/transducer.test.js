import { transducer } from '../src/transdurex';

test('returns a function', () =>
  expect(typeof transducer(vi.fn())).toBe('function'));

test('works with a single function', () => {
  const initial = 10;
  const expectedOutput = Math.sqrt(initial);

  var composedFn = transducer(Math.sqrt);

  expect(composedFn(initial)).toBeCloseTo(expectedOutput, 4);
});

test('works with no functions', () => {
  const input = 10;

  expect(transducer(input)).toBe(input);
});

test('handles variadic arguments', () => {
  var sum = (...numbers) => numbers.reduce((acc, number) => acc + number, 0);
  const input = [1, 2, 3, 4];
  const expectedOutput = sum(...input);

  var composedFn = transducer(sum);

  expect(composedFn(...input)).toBe(expectedOutput);
});

test('handles complex function compositions', () => {
  var add = a => b => a + b;
  var multiplyBy2 = num => num * 2;
  var subtractBy5 = num => num - 5;
  const augend = 113;
  const addend = 9912;
  const expectedOutput = multiplyBy2(
    Math.sqrt(subtractBy5(multiplyBy2(add(augend)(addend))))
  );

  var composedFn = transducer(
    multiplyBy2,
    Math.sqrt,
    subtractBy5,
    multiplyBy2,
    add(addend)
  );

  expect(composedFn(augend)).toBeCloseTo(expectedOutput, 4);
});
