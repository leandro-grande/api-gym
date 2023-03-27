import { GymsRepository } from '@/modules/gym/repositories/gymsRepository';
import { CheckinsRepository } from '../repositories/checkinsRepository';
import { CheckinUseCase } from '../useCases/createCheckin/checkinUseCase';


export function MakeCheckinUseCase() {
	const checkinsRepository = new CheckinsRepository();
	const gymsRepository = new GymsRepository();

	const checkinsUseCase = new CheckinUseCase(checkinsRepository, gymsRepository);

	return checkinsUseCase;
}