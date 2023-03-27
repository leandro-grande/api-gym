import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from 'utils/test/createAndAuthenticateUser';


describe('List Gyms Near (e2e)', () => {
	it('should be able to list gym nearby', async () => {
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

		await request(app)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Typescript Gym', 
				description: 'Gym 01 description', 
				phone: '1199999999', 
				latitude: -23.1893004,
				longitude: -46.9327692,
			});

		const response = await request(app)
			.get('/gyms/nearby')
			.query({
				latitude: -23.4506127,
				longitude: -46.5451525,
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