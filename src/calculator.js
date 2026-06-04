/**
 * calculator.js - Node.js CLI Calculator
 *
 * Supported operations:
 *   add      - Addition: returns the sum of two numbers
 *   subtract - Subtraction: returns the difference of two numbers
 *   multiply - Multiplication: returns the product of two numbers
 *   divide   - Division: returns the quotient of two numbers (error on divide by zero)
 *   modulo   - Modulo: returns the remainder of division (error on modulo by zero)
 *   power    - Exponentiation: returns base raised to exponent
 *   sqrt     - Square root: returns the square root of a number (error on negatives)
 *
 * Usage:
 *   node calculator.js <operation> <num1> [num2]
 *
 * Examples:
 *   node calculator.js add 5 3       => 8
 *   node calculator.js subtract 9 4  => 5
 *   node calculator.js multiply 6 7  => 42
 *   node calculator.js divide 10 2   => 5
 */

// Addition: returns the sum of a and b
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of a and b
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of a divided by b
// Throws an error if b is zero to prevent division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

// Modulo: returns the remainder of a divided by b
// Throws an error if b is zero to prevent modulo by zero
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

// Power: returns base raised to exponent
function power(base, exponent) {
  return base ** exponent;
}

// Square root: returns the square root of n
// Throws an error if n is negative
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of negative numbers is not allowed.');
  }
  return Math.sqrt(n);
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// CLI entry point
if (require.main === module) {
  const [, , operation, num1Str, num2Str] = process.argv;
  const normalizedOperation = operation ? operation.toLowerCase() : operation;
  const isSquareRootOperation = normalizedOperation === 'sqrt' || normalizedOperation === 'squareroot';

  if (!operation) {
    console.error('Usage: node calculator.js <add|subtract|multiply|divide|modulo|power|sqrt> <num1> [num2]');
    process.exit(1);
  }

  if (isSquareRootOperation && (num1Str === undefined || num2Str !== undefined)) {
    console.error('Usage: node calculator.js <add|subtract|multiply|divide|modulo|power|sqrt> <num1> [num2]');
    process.exit(1);
  }

  if (!isSquareRootOperation && (num1Str === undefined || num2Str === undefined)) {
    console.error('Usage: node calculator.js <add|subtract|multiply|divide|modulo|power|sqrt> <num1> [num2]');
    process.exit(1);
  }

  const a = parseFloat(num1Str);
  const b = num2Str !== undefined ? parseFloat(num2Str) : undefined;

  if (isNaN(a) || (!isSquareRootOperation && isNaN(b))) {
    console.error(`Error: ${isSquareRootOperation ? 'Operand must be a valid number.' : 'Both operands must be valid numbers.'}`);
    process.exit(1);
  }

  try {
    let result;
    switch (normalizedOperation) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
      case 'modulo':
        result = modulo(a, b);
        break;
      case 'power':
        result = power(a, b);
        break;
      case 'sqrt':
      case 'squareroot':
        result = squareRoot(a);
        break;
      default:
        console.error(`Error: Unknown operation "${operation}". Use add, subtract, multiply, divide, modulo, power, or sqrt.`);
        process.exit(1);
    }
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
