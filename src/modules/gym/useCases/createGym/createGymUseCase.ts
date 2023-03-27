import { Gym } from '@prisma/client';
import { GymsRepository } from '../../repositories/gymsRepository';

interface CreateGymRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymResponse {
  gym: Gym;
}


export class CreateGymUseCase {
	constructor(
    private gymsRepository: GymsRepository 
	) {}
	async execute({ 
		title, 
		description, 
		phone, 
		latitude, 
		longitude
	}: CreateGymRequest): Promise<CreateGymResponse> {

		const gym = await this.gymsRepository.create({
			title, 
			description, 
			phone, 
			latitude, 
			longitude
		});

		return {
			gym
		};
	}
}