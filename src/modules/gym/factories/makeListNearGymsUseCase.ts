import { GymsRepository } from '../repositories/gymsRepository';
import { ListNearByGymsUseCase } from '../useCases/listNearByGyms/listNearByGymsUseCase';


export function MakeListNearGymsUseCase() {
	const gymsRepository = new GymsRepository();
	const listNearByGymsUseCase = new ListNearByGymsUseCase(gymsRepository);

	return listNearByGymsUseCase;
}