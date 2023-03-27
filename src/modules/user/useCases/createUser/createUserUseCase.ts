import { UsersRepository } from '../../repositories/usersRepository';
import { hash } from 'bcryptjs';
import { AppError } from '@/utils/errors';
import { User } from '@prisma/client';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUser {
	constructor(
		private usersRepository: UsersRepository
	) {}

	async execute({ name, email, password }: UserRequest): Promise<User> {

		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError('User Already Exists', 409);
		}

		const passwordHash = await hash(password, 6);

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash: passwordHash
		});

		return user;
	}
}
