import { CheckinsRepository } from '../repositories/checkinsRepository';
import { ListCheckinHistoryUseCase } from '../useCases/listCheckinHistory/listCheckinHistoryUseCase';


export function MakeListCheckinHistoryUseCase() {
	const checkinsRepository = new CheckinsRepository();

	const listCheckinHistoryUseCase = new ListCheckinHistoryUseCase(checkinsRepository);

	return listCheckinHistoryUseCase;
}