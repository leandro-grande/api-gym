import { AppError } from '@/utils/errors';
import { User } from '@prisma/client';
import { UsersRepository } from '../../repositories/usersRepository';

interface getUserProfileRequest {
  user_id: string;
}

interface getUserProfileResponse {
  user: User
}

export class GetUserProfileUseCase {
	constructor(
    private usersRepository: UsersRepository
	) {}

	async execute({ user_id }: getUserProfileRequest): Promise<getUserProfileResponse> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User does not exists', 404);
		}

		return {
			user
		};
	}
}