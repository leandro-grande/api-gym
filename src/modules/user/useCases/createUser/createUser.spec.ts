import { describe, it, expect, beforeEach } from 'vitest';
import { inMemoryUserRepository } from '@/modules/user/repositories/inMemoryRepository/inMemoryUsersRepository';
import { CreateUser } from './createUserUseCase';
import { compare } from 'bcryptjs';
import { AppError } from '@/utils/errors';

let usersRepository: inMemoryUserRepository;
let createUser: CreateUser;

describe('CreateUser Use Case', () => {
	beforeEach(() => {
		usersRepository = new inMemoryUserRepository();
		createUser = new CreateUser(usersRepository);
	});

	it('should be able to register', async () => {
		const user = await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: '123456'
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should hash user password upon registration', async () => {
		const user = await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: '123456'
		});

		const isPasswordMatched = await compare('123456', user.password_hash);

		expect(isPasswordMatched).toBe(true);
	});

	it('should not be able to register with same email', async () => {
		const email = 'johndoe@email.com';

		await createUser.execute({
			name: 'John Doe',
			email,
			password: '123456'
		});

		await expect(() => 
			createUser.execute({
				name: 'John Doe',
				email,
				password: '123456'
			}),
		).rejects.toBeInstanceOf(AppError);

	});

});