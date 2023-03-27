import { AppError } from '@/utils/errors';
import { Checkin } from '@prisma/client';
import { CheckinsRepository } from '@/modules/checkin/repositories/checkinsRepository';
import { GymsRepository } from '@/modules/gym/repositories/gymsRepository';
import { getDistanceBetweenCoordinates } from 'utils/getDistanceBetweenCoordinates';

interface CheckinRequest {
  user_id: string;
  gym_id: string;
	userLatitude: number;
	userLongitude: number;
}

interface CheckinResponse {
  checkin: Checkin;
}


export class CheckinUseCase {
	constructor(
    private checkinsRepository: CheckinsRepository,
		private gymsRepository: GymsRepository
	){}

	async execute({ 
		user_id, 
		gym_id, 
		userLatitude, 
		userLongitude 
	}: CheckinRequest): Promise<CheckinResponse> {
		
		const gym = await this.gymsRepository.findById(gym_id);

		if (!gym) {
			throw new AppError('Gym does not exists', 404);
		}

		// Calcular a distancia
		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
		);

		const MAX_DISTANCE_IN_KILOMETERS = 0.1;

		if (distance > MAX_DISTANCE_IN_KILOMETERS ) {
			throw new AppError('Distance from user to gym is more than 100 meters');
		}
		
		const checkinOnSameDay = await this.checkinsRepository.findUserIdOnDate(
			user_id, 
			new Date()
		);

		if (checkinOnSameDay) {
			throw new AppError('There is already a checkin in this day');
		}

		const checkin = await this.checkinsRepository.create({
			user_id,
			gym_id
		});


		return {
			checkin
		};
	}
}