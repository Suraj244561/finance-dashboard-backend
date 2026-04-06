const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('viewer', 'analyst', 'admin').required(),
  status: Joi.string().valid('active', 'inactive').default('active')
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  role: Joi.string().valid('viewer', 'analyst', 'admin'),
  status: Joi.string().valid('active', 'inactive')
}).min(1);

const recordSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().min(2).max(50).required(),
  date: Joi.date().iso().required(),
  notes: Joi.string().allow('', null).max(255)
});

module.exports = { loginSchema, userSchema, userUpdateSchema, recordSchema };
