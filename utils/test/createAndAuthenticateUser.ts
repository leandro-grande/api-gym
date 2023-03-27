import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/prisma';
import { hash } from 'bcryptjs';


export async function createAndAuthenticateUser(isAdmin = false) {
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@email.com',
			password_hash: await hash('123456', 6),
			role: isAdmin ? 'ADMIN' : 'MEMBER'
		}
	});


	const authResponse = await request(app)
		.post('/sessions')
		.send({
			email: 'johndoe@email.com',
			password: '123456'
		});

	const { token } = authResponse.body;

	return {
		token
	};
}