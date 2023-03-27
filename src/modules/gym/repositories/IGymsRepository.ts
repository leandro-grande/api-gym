import { Gym, Prisma } from '@prisma/client';

export interface FindManyNearByParams {
  latitude: number;
  longitude: number;
}

export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(gym_id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearBy({ latitude, longitude }: FindManyNearByParams): Promise<Gym[]>;
}