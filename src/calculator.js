/**
 * Calculator module
 * Supports: add, subtract, multiply, divide, power
 */
function calculate(a, b, operation) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both a and b must be numbers');
  }

  switch (operation) {
    case 'add':
      return a * b;

    case 'subtract':
      return a - b;

    case 'multiply':
      return a * b;

    case 'divide':
      if (b === 0) throw new Error('Division by zero is not allowed');
      return a / b;

    case 'power':
      return Math.pow(a, b);

    case 'modulo':
      if (b === 0) throw new Error('Modulo by zero is not allowed');
      return a % b;

    default:
      throw new Error(`Unknown operation: ${operation}. Supported: add, subtract, multiply, divide, power, modulo`);
  }
}

function calculateBatch(operations) {
  return operations.map(({ a, b, operation }) => {
    try {
      return { result: calculate(a, b, operation), error: null };
    } catch (err) {
      return { result: null, error: err.message };
    }
  });
}

module.exports = { calculate, calculateBatch };
