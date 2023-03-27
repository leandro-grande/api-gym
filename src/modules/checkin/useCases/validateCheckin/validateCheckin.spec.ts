import { AppError } from '@/utils/errors';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckinsRepository } from '../../repositories/inMemoryRepository/inMemoryCheckinsRepository';
import { ValidateCheckinUseCase } from './validateCheckinUseCase';

let checkinsRepository: InMemoryCheckinsRepository;
let validateCheckinUseCase: ValidateCheckinUseCase;

describe('Validate CheckIn Use Case', () => {
	beforeEach( async () => {
		checkinsRepository = new InMemoryCheckinsRepository;
		validateCheckinUseCase = new ValidateCheckinUseCase(checkinsRepository);


		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to validate a checkin', async () => {
		const createdCheckIn = await checkinsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		const { checkIn } = await validateCheckinUseCase.execute({
			checkin_id: createdCheckIn.id
		});

		expect(checkIn.validate_at).toEqual(expect.any(Date));
		expect(checkinsRepository.items[0].validate_at).toEqual(expect.any(Date));
	});

	it('should not be able to validate an inexistent checkin', async () => {

		await expect(() => 
			validateCheckinUseCase.execute({
				checkin_id: 'inexistent-id'
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to validate checkIn after 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

		const createdCheckIn = await checkinsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		const twentyOneMinutesAfter = 1000 * 60 * 21; //21 minutes

		vi.advanceTimersByTime(twentyOneMinutesAfter);

		await expect(() => 
			validateCheckinUseCase.execute({
				checkin_id: createdCheckIn.id
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
