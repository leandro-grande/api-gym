import { Request, Response } from 'express';
import { z } from 'zod';
import { makeAuthenticateUseCase } from '../../factories/makeAuthenticateUseCase';


export class AuthenticateController {
	async handle(request: Request, response: Response) {

		const authenticateBodySchema = z.object({
			email: z.string().email(),
			password: z.string().min(6)
		});

		const { email, password } = authenticateBodySchema.parse(request.body);

		const authenticateUseCase = makeAuthenticateUseCase();

		const { token, refreshToken } = await authenticateUseCase.execute({
			email,
			password
		});
    
		return response
			.status(200)
			.cookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true
			})
			.json({token});
	}
}