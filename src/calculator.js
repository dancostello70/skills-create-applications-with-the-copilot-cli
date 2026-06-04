/**
 * calculator.js - Node.js CLI Calculator
 *
 * Supported operations:
 *   add        - Addition: returns the sum of two numbers
 *   subtract   - Subtraction: returns the difference of two numbers
 *   multiply   - Multiplication: returns the product of two numbers
 *   divide     - Division: returns the quotient of two numbers (error on divide by zero)
 *   modulo     - Modulo: returns the remainder of a divided by b
 *   power      - Exponentiation: returns base raised to the exponent
 *   squareRoot - Square Root: returns the square root of n (error on negative numbers)
 *
 * Usage:
 *   node calculator.js <operation> <num1> [num2]
 *
 * Examples:
 *   node calculator.js add 5 3          => 8
 *   node calculator.js subtract 9 4     => 5
 *   node calculator.js multiply 6 7     => 42
 *   node calculator.js divide 10 2      => 5
 *   node calculator.js modulo 10 3      => 1
 *   node calculator.js power 2 8        => 256
 *   node calculator.js squareRoot 16    => 4
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
function modulo(a, b) {
  return a % b;
}

// Exponentiation: returns base raised to the exponent
function power(base, exponent) {
  return base ** exponent;
}

// Square Root: returns the square root of n
// Throws an error if n is negative
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(n);
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// CLI entry point
if (require.main === module) {
  const [, , operation, num1Str, num2Str] = process.argv;

  const singleOperandOps = ['squareRoot'];
  const needsSecondOperand = !singleOperandOps.includes(operation);

  if (!operation || num1Str === undefined || (needsSecondOperand && num2Str === undefined)) {
    console.error('Usage: node calculator.js <add|subtract|multiply|divide|modulo|power|squareRoot> <num1> [num2]');
    process.exit(1);
  }

  const a = parseFloat(num1Str);
  const b = parseFloat(num2Str);

  if (isNaN(a) || (needsSecondOperand && isNaN(b))) {
    console.error('Error: Operands must be valid numbers.');
    process.exit(1);
  }

  try {
    let result;
    switch (operation) {
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
      case 'squareRoot':
        result = squareRoot(a);
        break;
      default:
        console.error(`Error: Unknown operation "${operation}". Use add, subtract, multiply, divide, modulo, power, or squareRoot.`);
        process.exit(1);
    }
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
