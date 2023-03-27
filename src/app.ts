/* eslint-disable @typescript-eslint/no-unused-vars */
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { AppError } from './utils/errors';
import { routes } from './routes';
import { env } from './env';
import { ZodError } from 'zod';

export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({error: err.message});
	} else if (err instanceof ZodError)  {
		return response.json({ error: err.format() });
	}

	return response.status(500).json({status: 'error', message: 'Internal server error'});
});

