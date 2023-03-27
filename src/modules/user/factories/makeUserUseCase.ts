import { UsersRepository } from '../repositories/usersRepository';
import { CreateUser } from '../useCases/createUser/createUserUseCase';


export function makeUserUseCase() {
	const userRepository = new UsersRepository();
	const createUser = new CreateUser(userRepository);

	return createUser;
}