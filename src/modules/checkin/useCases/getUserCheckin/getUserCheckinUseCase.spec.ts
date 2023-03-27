import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckinsRepository } from '../../repositories/inMemoryRepository/inMemoryCheckinsRepository';
import { GetUserCheckinUseCase } from './getUserCheckinUseCase';

let checkinsRepository: InMemoryCheckinsRepository;
let getUserCheckinUseCase: GetUserCheckinUseCase;

describe('Get User Checkin Use Case', () => {
	beforeEach(() => {
		checkinsRepository = new InMemoryCheckinsRepository;
		getUserCheckinUseCase = new GetUserCheckinUseCase(checkinsRepository);
	});

	it('should be able list check-in history', async () => {
		await checkinsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		await checkinsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		});

		const { checkInsCount } = await getUserCheckinUseCase.execute({
			user_id: 'user-01',
		});

		expect(checkInsCount).toEqual(2);
	});

});