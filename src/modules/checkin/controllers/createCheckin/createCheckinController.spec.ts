import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from 'utils/test/createAndAuthenticateUser';
import { prisma } from '@/prisma';


describe('Create Checkin (e2e)', () => {
	it('should be able to create a checkin ', async () => {
		const { token } = await createAndAuthenticateUser(true);

		const gym = await prisma.gym.create({
			data: {
				title: 'Javascript Gym',
				latitude: -23.4506127,
				longitude: -46.5451525,
			}
		});

		const response = await request(app)
			.post(`/gyms/${gym.id}/checkin`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -23.4506127,
				longitude: -46.5451525,
			});

		expect(response.statusCode).toEqual(201);
	});

});