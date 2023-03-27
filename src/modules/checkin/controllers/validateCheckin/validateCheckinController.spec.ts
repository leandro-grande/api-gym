import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from 'utils/test/createAndAuthenticateUser';
import { prisma } from '@/prisma';


describe('Validate Checkin (e2e)', () => {
	it('should be able to validate the checkin', async () => {
		const { token } = await createAndAuthenticateUser(true);

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: 'Javascript Gym',
				latitude: -23.4506127,
				longitude: -46.5451525,
			}
		});

		const checkIn = await prisma.checkin.create({
			data: {
				gym_id: gym.id,
				user_id: user.id
			}
		});

		const response = await request(app)
			.patch(`/checkins/${checkIn.id}/validate`)
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(204);
	});

});