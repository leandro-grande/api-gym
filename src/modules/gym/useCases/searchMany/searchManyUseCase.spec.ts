import { AppError } from '@/utils/errors';
import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '../../repositories/InMemoryRepository/inMemoryGymsRepository';
import { SearchManyUseCase } from './searchManyUseCase';

let gymsRepository: InMemoryGymsRepository;
let searchManyUseCase: SearchManyUseCase;

describe('Gym Search Many Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository;
		searchManyUseCase = new SearchManyUseCase(gymsRepository);
	});

	it('should be able to search Gyms', async () => {
		await gymsRepository.create({
			title: 'Javascript Gym',
			description: null,
			phone: null,
			latitude: -23.4506127,
			longitude: -46.5451525,
		});

		await gymsRepository.create({
			title: 'Typescript Gym',
			description: null,
			phone: null,
			latitude: -23.4506127,
			longitude: -46.5451525,
		});
    
		const { gyms } = await searchManyUseCase.execute({
			query: 'Javascript',
			page: 1
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Javascript Gym', })
		]);
	});

	it('should not be able to search Gyms without query', async () => {

		await expect(() => 
			searchManyUseCase.execute({
				query: 'Typescript',
				page: 1,
			}),
		).rejects.toBeInstanceOf(AppError);
		
	});
});