import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';


describe('Autheticate User (e2e)', () => {
	it('should be able to authenticate user', async () => {
  
		await request(app)
			.post('/users')
			.send({
				name: 'John Doe',
				email: 'johndoe@email.com',
				password: '123456'
			});

		const response = await request(app)
			.post('/sessions')
			.send({
				email: 'johndoe@email.com',
				password: '123456'
			});


		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String)
		});
	});
});