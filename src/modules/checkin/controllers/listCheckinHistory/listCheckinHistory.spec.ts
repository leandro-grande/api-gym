import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from 'utils/test/createAndAuthenticateUser';
import { prisma } from '@/prisma';


describe('List Checkin Historical (e2e)', () => {
	it('should be able to list checkin historical', async () => {
		const { token } = await createAndAuthenticateUser();

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: 'Javascript Gym',
				latitude: -23.4506127,
				longitude: -46.5451525,
			}
		});

		await prisma.checkin.createMany({
			data: [
				{
					gym_id: gym.id,
					user_id: user.id
				},
				{
					gym_id: gym.id,
					user_id: user.id
				},
			]
		});

		const response = await request(app)
			.get('/checkins/history/page')
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual([
			expect.objectContaining({
				gym_id: gym.id,
				user_id: user.id
			}),
			expect.objectContaining({
				gym_id: gym.id,
				user_id: user.id
			}),
		]);
	});

});