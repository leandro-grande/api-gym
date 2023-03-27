import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';


describe('Create User (e2e)', () => {
	it('should be able to create user', async () => {

		const response = await request(app)
			.post('/users')
			.send({
				name: 'John Doe',
				email: 'johndoe@email.com',
				password: '123456'
			});


		expect(response.statusCode).toEqual(201);
	});
});