import { GymsRepository } from '../repositories/gymsRepository';
import { CreateGymUseCase } from '../useCases/createGym/createGymUseCase';


export function MakeCreateGymsUseCase() {
	const gymsRepository = new GymsRepository();
	const createGymUseCase = new CreateGymUseCase(gymsRepository);

	return createGymUseCase;
}