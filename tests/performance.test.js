const { calculate, calculateBatch } = require('../src/calculator');

// Performance threshold in milliseconds
const THRESHOLD_MS = 100;

describe('Performance Tests', () => {
  test('single calculation completes within threshold', () => {
    const start = Date.now();
    calculate(999999, 888888, 'multiply');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(THRESHOLD_MS);
  });

  test('batch of 1000 calculations completes within threshold', () => {
    const ops = Array.from({ length: 1000 }, (_, i) => ({
      a: i, b: i + 1, operation: 'add'
    }));
    const start = Date.now();
    calculateBatch(ops);
    const duration = Date.now() - start;
    console.log(`Batch 1000 ops: ${duration}ms`);
    expect(duration).toBeLessThan(THRESHOLD_MS);
  });

  test('power calculations complete within threshold', () => {
    const start = Date.now();
    for (let i = 0; i < 500; i++) {
      calculate(2, 20, 'power');
    }
    const duration = Date.now() - start;
    console.log(`500 power ops: ${duration}ms`);
    expect(duration).toBeLessThan(THRESHOLD_MS);
  });
});

describe('Validator Performance Tests', () => {
  const { validateUser } = require('../src/validator');

  test('validates 500 users within threshold', () => {
    const users = Array.from({ length: 500 }, (_, i) => ({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: 'user',
      age: 20 + (i % 50)
    }));

    const start = Date.now();
    users.forEach(u => validateUser(u));
    const duration = Date.now() - start;
    console.log(`500 validations: ${duration}ms`);
    expect(duration).toBeLessThan(THRESHOLD_MS);
  });
});
