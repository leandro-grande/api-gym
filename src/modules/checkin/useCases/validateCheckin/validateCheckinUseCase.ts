import { AppError } from '@/utils/errors';
import { Checkin } from '@prisma/client';
import dayjs from 'dayjs';
import { CheckinsRepository } from '../../repositories/checkinsRepository';

interface ValidateCheckinUseCaseRequest {
  checkin_id: string;
}

interface ValidateCheckinUseCaseResponse {
  checkIn: Checkin;
}

export class ValidateCheckinUseCase {
	constructor(
    private checkinsRepository: CheckinsRepository
	) {}
	async execute({ checkin_id }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
		const checkIn = await this.checkinsRepository.findById(checkin_id);

		if (!checkIn) {
			throw new AppError('CheckIn not found', 404);
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			'minutes'
		);

		if (distanceInMinutesFromCheckInCreation > 20) {
			throw new AppError('Checkin is after 20 minutes of its creation');
		}

		checkIn.validate_at = new Date();

		await this.checkinsRepository.save(checkIn);

		return {
			checkIn
		};
	}
}