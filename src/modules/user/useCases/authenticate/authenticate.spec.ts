import { AppError } from '@/utils/errors';
import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { inMemoryUserRepository } from '../../repositories/inMemoryRepository/inMemoryUsersRepository';
import { AuthenticateUseCase } from './authenticate';

let usersRepository: inMemoryUserRepository;
let sut: AuthenticateUseCase;

describe('Authenticate UseCase', () => {
	beforeEach(() => {
		usersRepository = new inMemoryUserRepository();
		sut = new AuthenticateUseCase(usersRepository);
	});

	it('should be able to authenticate', async () => {

		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password_hash: await hash('123456', 6),
		});

		const { token } = await sut.execute({
			email: 'johndoe@email.com',
			password: '123456',
		});

		expect(token).toEqual(expect.any(String));
	});

	it('should not be able to authenticate with wrong email', async () => {

		await expect(() => 
			sut.execute({
				email: 'johndoe@email.com',
				password: '123456',
			})).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password', async () => {

		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password_hash: await hash('123456', 6),
		});
    
		await expect(() => 
			sut.execute({
				email: 'johndoe@email.com',
				password: 'wrong-password',
			})).rejects.toBeInstanceOf(AppError);
	});
});