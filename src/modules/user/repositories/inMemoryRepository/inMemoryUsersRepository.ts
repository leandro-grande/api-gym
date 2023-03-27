import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { IUsersRepository } from '../IUsersRepository';


export class inMemoryUserRepository implements IUsersRepository {

	public items: User[] = [];
	
	async create({ name, email, password_hash, role = 'ADMIN' }: Prisma.UserCreateInput): Promise<User> {
		const user = {
			id: randomUUID(),
			name,
			email,
			password_hash,
			role,
			created_at: new Date()
		};

		this.items.push(user);

		return user;
	}


	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find(item => item.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async findById(user_id: string): Promise<User | null> {
		const user = this.items.find(item => item.id === user_id);

		if (!user) {
			return null;
		}

		return user;
	}
  
}