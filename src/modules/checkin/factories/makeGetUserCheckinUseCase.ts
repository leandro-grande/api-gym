import { CheckinsRepository } from '../repositories/checkinsRepository';
import { GetUserCheckinUseCase } from '../useCases/getUserCheckin/getUserCheckinUseCase';


export function MakeGetUserCheckinUseCase() {
	const checkinsRepository = new CheckinsRepository();
	const getUserCheckinUseCase = new GetUserCheckinUseCase(checkinsRepository);

	return getUserCheckinUseCase;
}