import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(errorHandler);

  return app;
};
