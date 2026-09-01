import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { registerSchema } from '../validators/auth.schemas.js';
import {
  registerController,
  activateController,
} from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.post('/registration', validate(registerSchema), registerController);
authRouter.get('/activation/:activationToken', activateController);
