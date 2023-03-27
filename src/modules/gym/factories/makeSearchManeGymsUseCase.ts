import { GymsRepository } from '../repositories/gymsRepository';
import { SearchManyUseCase } from '../useCases/searchMany/searchManyUseCase';


export function MakeSearchManyGymsUseCase() {
	const gymsRepository = new GymsRepository();
	const searchManyUseCase = new SearchManyUseCase(gymsRepository);

	return searchManyUseCase;
}