import { Checkin, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { ICheckinsRepository } from '../ICheckinRepository';


export class InMemoryCheckinsRepository implements ICheckinsRepository {
	public items: Checkin[] = [];

	async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
		const checkin = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			created_at: new Date(),
			validate_at: data.validate_at ? new Date(data.validate_at) : null
		};

		this.items.push(checkin);

		return checkin;
	}

	async save(checkIn: Checkin) {
		const checkInIndex = this.items.findIndex(item => item.id === checkIn.id);

		if(checkInIndex) {
			this.items[checkInIndex] = checkIn;
		}

		return checkIn;
	}

	async findUserIdOnDate(user_id: string, date: Date): Promise<Checkin | null> {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkinOnSameDate = this.items.find(checkin => {
			const checkInDate = dayjs(checkin.created_at);
			const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

			return checkin.user_id === user_id && isOnSameDate;
		});

		if (!checkinOnSameDate) {
			return null;
		}

		return checkinOnSameDate;
	}

	async findById(checkin_id: string): Promise<Checkin | null> {
		const checkin = this.items.find(item => item.id === checkin_id);

		if (!checkin) {
			return null;
		}

		return checkin;
	}

	async findManyById(user_id: string, page: number) {
		return this.items
			.filter(item => item.user_id === user_id)
			.slice((page - 1) * 20, page * 20);
	}

	async countByUserId(user_id: string) {
		return this.items.filter(item => item.user_id === user_id).length;
	}
}