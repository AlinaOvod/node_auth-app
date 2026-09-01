import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  updateNameSchema,
  changePasswordSchema,
} from '../validators/users.schemas.js';
import {
  getMeController,
  updateNameController,
  changePasswordController,
} from '../controllers/users.controller.js';

export const usersRouter = Router();

usersRouter.use(requireAuth);

usersRouter.get('/me', getMeController);
usersRouter.patch('/me', validate(updateNameSchema), updateNameController);

usersRouter.post(
  '/me/password',
  validate(changePasswordSchema),
  changePasswordController,
);
