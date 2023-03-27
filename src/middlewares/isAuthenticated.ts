import { env } from '@/env';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
	role: 'ADMIN' | 'MEMBER';
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authToken = request.headers.authorization;

	if (!authToken) {
		return response.status(401).end();
	}

	const [, token] = authToken.split(' ');
  
	try {
		const { sub, role } = verify(token, env.JWT_SECRET) as Payload;

		request.user_id = sub;
		request.role = role;

		next();
	} catch {
		return response.status(401).json({error: 'token.invalid'});
	}


}