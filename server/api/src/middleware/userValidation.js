// middleware/validateRegister.js
const Joi = require('joi');

const registerSchema = Joi.object({
  fullName: Joi.string().min(3).required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Invalid gender',
    'string.empty': 'Gender is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Valid email is required',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
  }),
  dateOfBirth: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required',
  }),
  caste: Joi.string().optional().allow(''),
  religion: Joi.string().optional().allow(''),
  occupation: Joi.string().optional().allow(''),
  description: Joi.string().optional().allow(''),
  education: Joi.string().optional().allow(''),
  interests: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string() // allow comma-separated string
  ).optional(),
}).unknown(true);

function validateRegister(req, res, next) {
  // Check files manually (multer must run before this middleware)
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'At least one profile image is required' });
  }

  // Normalize interests if sent as comma-separated string
  if (typeof req.body.interests === 'string') {
    req.body.interests = req.body.interests.split(',').map(s => s.trim());
  }

  // Validate req.body fields with Joi
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(err => ({
      msg: err.message,
      path: err.path.join('.'),
    }));
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = { validateRegister };
