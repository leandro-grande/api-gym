import { AppError } from '@/utils/errors';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepository } from '../../repositories/usersRepository';
import { env } from '@/env';

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  token: string,
	refreshToken: string
}


export class AuthenticateUseCase {
	constructor(
    private usersRepository: UsersRepository
	) {}

	async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {

		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Invalid credentials');
		}

		const isPasswordMatched = await compare(password, user.password_hash);

		if (!isPasswordMatched) {
			throw new AppError('Invalid credentials');
		}

		const token = sign( 
			{
				role: user.role
			},
			env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: '10m'
			}
		);


		const refreshToken = sign( 
			{
				role: user.role
			},
			env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: '7d'
			}
		);

		return {
			token,
			refreshToken
		};
	}
  
} 