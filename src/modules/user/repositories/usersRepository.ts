import { prisma } from '@/prisma';
import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from './IUsersRepository';


export class UsersRepository implements IUsersRepository {

	async create({ name, email, password_hash }: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password_hash
			}
		});

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		return user;
	}

	async findById(user_id: string): Promise<User | null> {
		const user = await prisma.user.findFirst({
			where: {
				id: user_id
			}
		});

		return user;
	}
  
}