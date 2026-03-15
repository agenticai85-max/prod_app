const { calculate, calculateBatch } = require('../src/calculator');

describe('Calculator Unit Tests', () => {
  describe('add', () => {
    test('adds positive numbers', () => expect(calculate(2, 3, 'add')).toBe(5));
    test('adds negative numbers', () => expect(calculate(-1, -2, 'add')).toBe(-3));
    test('adds zero', () => expect(calculate(5, 0, 'add')).toBe(5));
    test('adds decimals', () => expect(calculate(1.5, 2.5, 'add')).toBe(4));
  });

  describe('subtract', () => {
    test('subtracts positive numbers', () => expect(calculate(10, 3, 'subtract')).toBe(7));
    test('subtracts to negative', () => expect(calculate(3, 10, 'subtract')).toBe(-7));
  });

  describe('multiply', () => {
    test('multiplies positive numbers', () => expect(calculate(4, 5, 'multiply')).toBe(20));
    test('multiplies by zero', () => expect(calculate(100, 0, 'multiply')).toBe(0));
    test('multiplies negatives', () => expect(calculate(-3, -4, 'multiply')).toBe(12));
  });

  describe('divide', () => {
    test('divides evenly', () => expect(calculate(20, 4, 'divide')).toBe(5));
    test('divides with decimal result', () => expect(calculate(10, 3, 'divide')).toBeCloseTo(3.333));
    test('throws on division by zero', () => {
      expect(() => calculate(10, 0, 'divide')).toThrow('Division by zero');
    });
  });

  describe('power', () => {
    test('calculates power', () => expect(calculate(2, 10, 'power')).toBe(1024));
    test('power of zero', () => expect(calculate(5, 0, 'power')).toBe(1));
  });

  describe('modulo', () => {
    test('calculates modulo', () => expect(calculate(10, 3, 'modulo')).toBe(1));
    test('throws on modulo by zero', () => {
      expect(() => calculate(10, 0, 'modulo')).toThrow('zero');
    });
  });

  describe('error cases', () => {
    test('throws on unknown operation', () => {
      expect(() => calculate(1, 2, 'unknown')).toThrow('Unknown operation');
    });
    test('throws when a is not a number', () => {
      expect(() => calculate('five', 2, 'add')).toThrow('must be numbers');
    });
    test('throws when b is not a number', () => {
      expect(() => calculate(5, 'two', 'add')).toThrow('must be numbers');
    });
  });

  describe('calculateBatch', () => {
    test('processes multiple operations', () => {
      const results = calculateBatch([
        { a: 1, b: 2, operation: 'add' },
        { a: 10, b: 5, operation: 'subtract' },
        { a: 3, b: 4, operation: 'multiply' }
      ]);
      expect(results[0].result).toBe(3);
      expect(results[1].result).toBe(5);
      expect(results[2].result).toBe(12);
    });

    test('handles errors in batch gracefully', () => {
      const results = calculateBatch([
        { a: 10, b: 0, operation: 'divide' },
        { a: 5, b: 5, operation: 'add' }
      ]);
      expect(results[0].error).toBeTruthy();
      expect(results[1].result).toBe(10);
    });
  });
});
