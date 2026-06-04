/**
 * calculator.js - Node.js CLI Calculator
 *
 * Supported operations:
 *   add      - Addition: returns the sum of two numbers
 *   subtract - Subtraction: returns the difference of two numbers
 *   multiply - Multiplication: returns the product of two numbers
 *   divide   - Division: returns the quotient of two numbers (error on divide by zero)
 *
 * Usage:
 *   node calculator.js <operation> <num1> <num2>
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

module.exports = { add, subtract, multiply, divide };

// CLI entry point
if (require.main === module) {
  const [, , operation, num1Str, num2Str] = process.argv;

  if (!operation || num1Str === undefined || num2Str === undefined) {
    console.error('Usage: node calculator.js <add|subtract|multiply|divide> <num1> <num2>');
    process.exit(1);
  }

  const a = parseFloat(num1Str);
  const b = parseFloat(num2Str);

  if (isNaN(a) || isNaN(b)) {
    console.error('Error: Both operands must be valid numbers.');
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
      default:
        console.error(`Error: Unknown operation "${operation}". Use add, subtract, multiply, or divide.`);
        process.exit(1);
    }
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
