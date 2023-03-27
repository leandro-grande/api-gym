import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';


describe('Get User Profile (e2e)', () => {
	it('should be able to get user profile', async () => {
		await request(app)
			.post('/users')
			.send({
				name: 'John Doe',
				email: 'johndoe@email.com',
				password: '123456'
			});

		const authResponse = await request(app)
			.post('/sessions')
			.send({
				email: 'johndoe@email.com',
				password: '123456'
			});

		const { token } = authResponse.body;

		const profileResponse = await request(app)
			.get('/me')
			.set('authorization', `Bearer ${token}`)
			.send();

		expect(profileResponse.statusCode).toEqual(200);
		expect(profileResponse.body).toEqual(
			expect.objectContaining({
				email: 'johndoe@email.com',
			})
		);
	});

});