import { Checkin, Prisma } from '@prisma/client';


export interface ICheckinsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>;
  save(checkIn: Checkin): Promise<Checkin>;
  findUserIdOnDate(user_id: string, date: Date): Promise<Checkin | null>;
  findById(checkin_id: string): Promise<Checkin | null>;
  findManyById(user_id: string, page: number): Promise<Checkin[] | null>;
  countByUserId(user_id: string): Promise<number>;
}