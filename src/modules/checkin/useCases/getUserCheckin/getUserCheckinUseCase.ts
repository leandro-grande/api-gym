import { CheckinsRepository } from '../../repositories/checkinsRepository';

interface GetUserCheckinRequest {
  user_id: string;
}

interface GetUserCheckinResponse {
  checkInsCount: number;
}

export class GetUserCheckinUseCase {
	constructor (
    private checkinsRepository: CheckinsRepository
	) {}
	async execute({ user_id }: GetUserCheckinRequest): Promise<GetUserCheckinResponse> {
		const checkInsCount = await this.checkinsRepository.countByUserId(user_id);

		return {
			checkInsCount
		};
	}

}