import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckinsRepository } from '../../repositories/inMemoryRepository/inMemoryCheckinsRepository';
import { ListCheckinHistoryUseCase } from './listCheckinHistoryUseCase';

let checkinsRepository: InMemoryCheckinsRepository;
let listCheckinHistoryUseCase: ListCheckinHistoryUseCase;

describe('List User Checkin History Use Case', () => {
	beforeEach(() => {
		checkinsRepository = new InMemoryCheckinsRepository;
		listCheckinHistoryUseCase = new ListCheckinHistoryUseCase(checkinsRepository);
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

		const { userCheckIns } = await listCheckinHistoryUseCase.execute({
			user_id: 'user-01',
			page: 1
		});

		expect(userCheckIns).toHaveLength(2);
		expect(userCheckIns).toEqual([
			expect.objectContaining({gym_id: 'gym-01',}),
			expect.objectContaining({gym_id: 'gym-02',})
		]);
	});

	it('should be able list paginated checkin history', async () => {

		for(let i = 1; i <= 22; i++ ) {
			await checkinsRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-01',
			});
		}

		const { userCheckIns } = await listCheckinHistoryUseCase.execute({
			user_id: 'user-01',
			page: 2,
		});

		expect(userCheckIns).toHaveLength(2);
		expect(userCheckIns).toEqual([
			expect.objectContaining({gym_id: 'gym-21',}),
			expect.objectContaining({gym_id: 'gym-22',})
		]);
	});

});