/**
 * User validation module
 * Validates user objects against business rules
 */
function validateUser(user) {
  const errors = [];

  // Name validation
  if (!user.name || typeof user.name !== 'string') {
    errors.push('name is required and must be a string');
  } else if (user.name.trim().length < 2) {
    errors.push('name must be at least 2 characters');
  } else if (user.name.trim().length > 100) {
    errors.push('name must be less than 100 characters');
  }

  // Email validation
  if (!user.email || typeof user.email !== 'string') {
    errors.push('email is required and must be a string');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      errors.push('email format is invalid');
    }
  }

  // Age validation (optional but if provided must be valid)
  if (user.age !== undefined) {
    if (typeof user.age !== 'number' || !Number.isInteger(user.age)) {
      errors.push('age must be an integer');
    } else if (user.age < 0 || user.age > 150) {
      errors.push('age must be between 0 and 150');
    }
  }

  // Role validation
  const validRoles = ['admin', 'user', 'viewer', 'editor'];
  if (user.role !== undefined && !validRoles.includes(user.role)) {
    errors.push(`role must be one of: ${validRoles.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function sanitizeUser(user) {
  return {
    name: user.name?.trim(),
    email: user.email?.toLowerCase().trim(),
    age: user.age,
    role: user.role || 'user'
  };
}

module.exports = { validateUser, sanitizeUser };
