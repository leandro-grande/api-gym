import { prisma } from '@/prisma';
import { Prisma, Gym } from '@prisma/client';
import { FindManyNearByParams, IGymsRepository } from './IGymsRepository';


export class GymsRepository implements IGymsRepository {

	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym = await prisma.gym.create({
			data
		});

		return gym;
	}

	async findById(gym_id: string) {
		const gym = await prisma.gym.findFirst({
			where: {
				id: gym_id
			}
		});

		return gym;
	}

	async searchMany(query: string, page: number) {
		const gym = await prisma.gym.findMany({
			where: {
				title: {
					contains: query
				}
			},
			take: 20, // 20 primeiros registros
			skip: (page - 1) * 20 // a partir
		});

		return gym;
	}

	async findManyNearBy({ latitude, longitude }: FindManyNearByParams){
		const gyms = await prisma.$queryRaw<Gym[]>`
		SELECT * from gyms
		WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`;
	
		return gyms;
	}

}