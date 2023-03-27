import { prisma } from '@/prisma';
import { Checkin, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { ICheckinsRepository } from './ICheckinRepository';


export class CheckinsRepository implements ICheckinsRepository {
	async create({ gym_id, user_id }: Prisma.CheckinUncheckedCreateInput) {
    
		const checkin = await prisma.checkin.create({
			data: {
				user_id,
				gym_id
			}
		});

		return checkin;
	}

	async save(checkIn: Checkin): Promise<Checkin> {
		const checkinUpdate = prisma.checkin.update({
			where: {
				id: checkIn.id
			},
			data: checkIn
		});

		return checkinUpdate;
	}

	async findUserIdOnDate(user_id: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');		

		const checkinOnSameDay = await prisma.checkin.findFirst({
			where: {
				user_id,
				created_at: {
					gte: startOfTheDay.toDate(),
					lte: endOfTheDay.toDate(),
				}
			}
		});

		return checkinOnSameDay;
	}

	async findManyById(user_id: string, page: number) {
		const usersCheckIns = await prisma.checkin.findMany({
			where: {
				user_id,
			},
			take: 20,
			skip: (page - 1) * 20
		});

		return usersCheckIns;
	}

	async countByUserId(user_id: string) {
		const checkInCount = await prisma.checkin.count({
			where: {
				user_id
			}
		});

		return checkInCount;
	}

	async findById(checkin_id: string): Promise<Checkin | null> {
		const checkIn = prisma.checkin.findFirst({
			where: {
				id: checkin_id
			}
		});

		return checkIn;
	}
}