const { execSync } = require('child_process');
const path = require('path');
const { add, subtract, multiply, divide } = require('../calculator');

const CLI = path.resolve(__dirname, '../calculator.js');

// ─── add ──────────────────────────────────────────────────────────────────────
describe('add', () => {
  // image examples
  test('2 + 3 = 5', () => expect(add(2, 3)).toBe(5));

  // additional cases
  test('adds negative numbers', () => expect(add(-4, -6)).toBe(-10));
  test('adds a negative and a positive', () => expect(add(-3, 7)).toBe(4));
  test('adds zero to a number', () => expect(add(0, 9)).toBe(9));
  test('adds two zeros', () => expect(add(0, 0)).toBe(0));
  test('adds decimals', () => expect(add(1.1, 2.2)).toBeCloseTo(3.3));
  test('adds large numbers', () => expect(add(1_000_000, 2_000_000)).toBe(3_000_000));
});

// ─── subtract ────────────────────────────────────────────────────────────────
describe('subtract', () => {
  // image examples
  test('10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));

  // additional cases
  test('subtracts to a negative result', () => expect(subtract(3, 10)).toBe(-7));
  test('subtracts negative numbers', () => expect(subtract(-5, -3)).toBe(-2));
  test('subtracts zero', () => expect(subtract(7, 0)).toBe(7));
  test('subtracts a number from itself', () => expect(subtract(8, 8)).toBe(0));
  test('subtracts decimals', () => expect(subtract(5.5, 2.2)).toBeCloseTo(3.3));
});

// ─── multiply ────────────────────────────────────────────────────────────────
describe('multiply', () => {
  // image examples
  test('45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));

  // additional cases
  test('multiplies by zero', () => expect(multiply(99, 0)).toBe(0));
  test('multiplies two negatives', () => expect(multiply(-3, -4)).toBe(12));
  test('multiplies a negative and a positive', () => expect(multiply(-3, 4)).toBe(-12));
  test('multiplies by one', () => expect(multiply(7, 1)).toBe(7));
  test('multiplies decimals', () => expect(multiply(2.5, 4)).toBeCloseTo(10));
  test('multiplies large numbers', () => expect(multiply(1000, 1000)).toBe(1_000_000));
});

// ─── divide ──────────────────────────────────────────────────────────────────
describe('divide', () => {
  // image examples
  test('20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));

  // additional cases
  test('divides to a decimal result', () => expect(divide(7, 2)).toBeCloseTo(3.5));
  test('divides a negative by a positive', () => expect(divide(-12, 4)).toBe(-3));
  test('divides a negative by a negative', () => expect(divide(-9, -3)).toBe(3));
  test('divides zero by a number', () => expect(divide(0, 5)).toBe(0));
  test('divides by one', () => expect(divide(42, 1)).toBe(42));
  test('divides decimals', () => expect(divide(1.5, 0.5)).toBeCloseTo(3));

  // edge case: division by zero
  test('throws on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed.');
  });
  test('throws on division by zero for negative dividend', () => {
    expect(() => divide(-5, 0)).toThrow('Division by zero is not allowed.');
  });
});

// ─── CLI integration ─────────────────────────────────────────────────────────
describe('CLI', () => {
  const run = (args) => execSync(`node ${CLI} ${args}`, { encoding: 'utf8' }).trim();
  const runErr = (args) => {
    try {
      execSync(`node ${CLI} ${args}`, { encoding: 'utf8', stdio: 'pipe' });
    } catch (e) {
      return { stdout: e.stdout.trim(), stderr: e.stderr.trim(), code: e.status };
    }
  };

  test('CLI add 2 3 prints 5', () => expect(run('add 2 3')).toBe('5'));
  test('CLI subtract 10 4 prints 6', () => expect(run('subtract 10 4')).toBe('6'));
  test('CLI multiply 45 2 prints 90', () => expect(run('multiply 45 2')).toBe('90'));
  test('CLI divide 20 5 prints 4', () => expect(run('divide 20 5')).toBe('4'));

  test('CLI exits with code 1 on division by zero', () => {
    const result = runErr('divide 10 0');
    expect(result.code).toBe(1);
    expect(result.stderr).toMatch(/Division by zero/);
  });

  test('CLI exits with code 1 on unknown operation', () => {
    const result = runErr('invalidOp 10 3');
    expect(result.code).toBe(1);
    expect(result.stderr).toMatch(/Unknown operation/);
  });

  test('CLI exits with code 1 on missing arguments', () => {
    const result = runErr('add 5');
    expect(result.code).toBe(1);
    expect(result.stderr).toMatch(/Usage/);
  });

  test('CLI exits with code 1 on non-numeric arguments', () => {
    const result = runErr('add foo bar');
    expect(result.code).toBe(1);
    expect(result.stderr).toMatch(/valid numbers/);
  });
});
