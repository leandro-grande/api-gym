import { Checkin } from '@prisma/client';
import { CheckinsRepository } from '../../repositories/checkinsRepository';

interface listCheckinHistoryRequest {
  user_id: string;
	page: number;
}

interface listCheckinHistoryResponse {
  userCheckIns: Checkin[];
}

export class ListCheckinHistoryUseCase {
	constructor(
    private checkinsRepository: CheckinsRepository
	) {}
	async execute({ user_id, page }: listCheckinHistoryRequest): Promise<listCheckinHistoryResponse> {
		const userCheckIns = await this.checkinsRepository.findManyById(user_id, page);

		return {
			userCheckIns
		};
	}

}