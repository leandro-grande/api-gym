import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from 'utils/test/createAndAuthenticateUser';


describe('Create Gym (e2e)', () => {
	it('should be able to create a gym', async () => {
		const { token } = await createAndAuthenticateUser(true);

		const response = await request(app)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 01', 
				description: 'Gym 01 description', 
				phone: '1199999999', 
				latitude: -23.4506127,
				longitude: -46.5451525,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual(
			expect.objectContaining({
				title: 'Gym 01'
			})
		);

	});

});