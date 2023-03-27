import { AppError } from '@/utils/errors';
import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { inMemoryUserRepository } from '../../repositories/inMemoryRepository/inMemoryUsersRepository';
import { GetUserProfileUseCase } from './getUserProfileUseCase';

let usersRepository: inMemoryUserRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Get User Profile UseCase', () => {
	beforeEach(() => {
		usersRepository = new inMemoryUserRepository;
		getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
	});

	it('should be able to get user profile', async () => {

		const createUser = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password_hash: await hash('123456', 6),
		});

		const { user } = await getUserProfileUseCase.execute({
			user_id: createUser.id
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not be able to get user profile with wrong user_id', async () => {
		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password_hash: await hash('123456', 6),
		});

		await expect(() => 
			getUserProfileUseCase.execute({
				user_id: 'wrong-id'
			}),
		).rejects.toBeInstanceOf(AppError);
	});

});