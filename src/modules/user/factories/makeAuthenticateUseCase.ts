import { UsersRepository } from '../repositories/usersRepository';
import { AuthenticateUseCase } from '../useCases/authenticate/authenticate';


export function makeAuthenticateUseCase() {
	const userRepository = new UsersRepository();
	const authenticateUseCase = new AuthenticateUseCase(userRepository);

	return authenticateUseCase;
}