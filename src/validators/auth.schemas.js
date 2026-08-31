import { z } from 'zod';
import { isPasswordValid } from '../lib/password.js';

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .refine(isPasswordValid, 'Password does not meet the requirements'),
});
