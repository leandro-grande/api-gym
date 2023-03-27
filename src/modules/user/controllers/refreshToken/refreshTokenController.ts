import { env } from '@/env';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
	role: 'ADMIN' | 'MEMBER'
}

export class RefreshTokenController {
	async handle(request: Request, response: Response) {
		
		
		const refreshToken = request.cookies['refreshToken']; 

		if (!refreshToken) {
			return response.status(401).send('Access Denied. No refresh token provided.');
		}

		try {
			const { sub, role } = verify(refreshToken, env.JWT_SECRET) as Payload ;

			const token = sign( 
				{
					role
				},
				env.JWT_SECRET,
				{
					subject: sub,
					expiresIn: '10m'
				}
			);
			

			return response.status(200).json({token});
		} catch {
			return response.status(400).send('Invalid refresh token.');
		}

	}
}