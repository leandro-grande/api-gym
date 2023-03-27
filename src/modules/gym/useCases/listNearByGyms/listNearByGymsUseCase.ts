import { GymsRepository } from '../../repositories/gymsRepository';

interface listNearByGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number
}


export class ListNearByGymsUseCase {
	constructor(
    private gymsRespository: GymsRepository
	) {}
	async execute({ userLatitude, userLongitude }: listNearByGymsUseCaseRequest) {
		const gyms = await this.gymsRespository.findManyNearBy({
			latitude: userLatitude,
			longitude: userLongitude
		});

		return {
			gyms
		};

	}
}