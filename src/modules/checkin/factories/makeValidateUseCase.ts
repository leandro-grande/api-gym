import { CheckinsRepository } from '../repositories/checkinsRepository';
import { ValidateCheckinUseCase } from '../useCases/validateCheckin/validateCheckinUseCase';


export function MakeValidateUseCase() {
	const checkinsRepository = new CheckinsRepository();
	const validateCheckinUseCase = new ValidateCheckinUseCase(checkinsRepository);

	return validateCheckinUseCase;
}