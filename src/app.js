const express = require('express');
const { calculate } = require('./calculator');
const { validateUser } = require('./validator');

const app = express();
app.use(express.json());

const VERSION = process.env.APP_VERSION || '1.0.0';
const START_TIME = Date.now();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: VERSION,
    uptime_seconds: Math.floor((Date.now() - START_TIME) / 1000),
    timestamp: new Date().toISOString()
  });
});

// Version endpoint
app.get('/version', (req, res) => {
  res.json({ version: VERSION });
});

// Calculator endpoint
app.post('/calculate', (req, res) => {
  const { a, b, operation } = req.body;
  if (a === undefined || b === undefined || !operation) {
    return res.status(400).json({ error: 'Missing required fields: a, b, operation' });
  }
  try {
    const result = calculate(a, b, operation);
    res.json({ result, operation, a, b });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User validation endpoint
app.post('/users/validate', (req, res) => {
  const { user } = req.body;
  if (!user) return res.status(400).json({ error: 'Missing user object' });
  const result = validateUser(user);
  if (result.valid) {
    res.json({ valid: true, message: 'User is valid' });
  } else {
    res.status(422).json({ valid: false, errors: result.errors });
  }
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
