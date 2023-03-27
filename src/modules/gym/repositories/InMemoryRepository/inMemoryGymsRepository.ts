import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'node:crypto';
import { getDistanceBetweenCoordinates } from 'utils/getDistanceBetweenCoordinates';
import { FindManyNearByParams, IGymsRepository } from '../IGymsRepository';


export class InMemoryGymsRepository implements IGymsRepository {
	public items: Gym[] = [];

	async findById(gym_id: string) {
		const gym = this.items.find(item => item.id === gym_id);

		if (!gym) {
			return null;
		}
    
		return gym;
	}

		
	async create(data: Prisma.GymCreateInput) {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Decimal(data.latitude.toString()),
			longitude: new Decimal(data.longitude.toString()),
			created_at: new Date()
		};

		this.items.push(gym);
		
		return gym;
	}

	async searchMany(query: string, page: number) {
		const gyms = this.items
			.filter(item => item.title.includes(query))
			.slice((page - 1) * 20, page * 20);

		return gyms;
	}

	async findManyNearBy({ latitude, longitude }: FindManyNearByParams) {
		return this.items.filter(item => {
			const distance = getDistanceBetweenCoordinates(
				{ latitude, longitude },
				{ latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
			);

			return distance < 10;
		});
	}

}