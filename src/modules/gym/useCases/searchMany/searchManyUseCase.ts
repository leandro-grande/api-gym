import { AppError } from '@/utils/errors';
import { Gym } from '@prisma/client';
import { GymsRepository } from '../../repositories/gymsRepository';

interface SearchManyUseCaseRequest {
  query: string;
  page: number;
}

interface SearchManyUseCaseResponse {
  gyms: Gym[] | null;
}


export class SearchManyUseCase {
	constructor(
    private gymsRepository: GymsRepository
	) {}
	async execute({ query, page }: SearchManyUseCaseRequest): Promise<SearchManyUseCaseResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page);

		if (gyms?.length === 0) {
			throw new AppError('Gym does not exists', 401);
		}

		return {
			gyms
		};

	}
}