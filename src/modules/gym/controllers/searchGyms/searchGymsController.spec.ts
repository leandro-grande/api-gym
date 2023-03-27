import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from 'utils/test/createAndAuthenticateUser';


describe('Search Gyms (e2e)', () => {
	it('should be able to search a gym', async () => {
		const { token } = await createAndAuthenticateUser(true);

		await request(app)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Javascript Gym', 
				description: 'Gym 01 description', 
				phone: '1199999999', 
				latitude: -23.4506127,
				longitude: -46.5451525,
			});

		const response = await request(app)
			.get('/gyms/search')
			.query({
				query: 'Javascript',
			})
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body).toHaveLength(1);
		expect(response.body).toEqual([
			expect.objectContaining({
				title: 'Javascript Gym', 
			})
		]);

	});

});