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
  // --- File validation ---
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "At least one profile image is required" });
  }

  // Allowed mime types (only images)
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 2 * 1024 * 1024; // 2 MB

  for (const file of req.files) {
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: `Invalid file type: ${file.originalname}` });
    }
    if (file.size > maxSize) {
      return res.status(400).json({ error: `File too large: ${file.originalname} (max 2MB)` });
    }
  }

  // --- Normalize fields ---
  if (typeof req.body.interests === "string") {
    req.body.interests = req.body.interests.split(",").map(s => s.trim());
  }

  // --- Joi validation ---
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(err => ({
      msg: err.message,
      path: err.path.join("."),
    }));
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = { validateRegister };
