import { UsersRepository } from '../repositories/usersRepository';
import { GetUserProfileUseCase } from '../useCases/getUserProfile/getUserProfileUseCase';


export function makeGetUsersProfileUseCase() {
	const userRepository = new UsersRepository();
	const getUsersProfileUseCase = new GetUserProfileUseCase(userRepository);

	return getUsersProfileUseCase;
}