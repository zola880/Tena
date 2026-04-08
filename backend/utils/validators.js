const z = require('zod');

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const profileUpdateSchema = z.object({
  age: z.number().int().positive().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  weightKg: z.number().positive().optional(),
  heightCm: z.number().positive().optional(),
  goal: z.string().optional(),
  conditions: z.string().optional(),
});

// Add other schemas as needed

module.exports = { registerSchema, profileUpdateSchema };