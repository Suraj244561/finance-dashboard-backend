const { loginSchema } = require('../utils/validators');
const authService = require('../services/authService');

async function login(req, res, next) {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { login };
