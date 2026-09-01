import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../validators/auth.schemas.js';
import {
  registerController,
  activateController,
  loginController,
} from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.post('/registration', validate(registerSchema), registerController);
authRouter.get('/activation/:activationToken', activateController);
authRouter.post('/login', validate(loginSchema), loginController);
