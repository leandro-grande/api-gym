import { Request, Response } from 'express';
import { z } from 'zod';
import { makeUserUseCase } from '../../factories/makeUserUseCase';

export class CreateUserController {
	async handle(request: Request, response: Response) {

		const createUserSchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(6)
		});

		const { name, email, password } = createUserSchema.parse(request.body);

		const createUserUseCase = makeUserUseCase(); 

		const user = await createUserUseCase.execute({ 
			name,
			email,
			password
		});

		return response.status(201).json(user);
	}
}