import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '../../repositories/InMemoryRepository/inMemoryGymsRepository';
import { ListNearByGymsUseCase } from './listNearByGymsUseCase';

let gymsRepository: InMemoryGymsRepository;
let listNearByGymsUseCase: ListNearByGymsUseCase;

describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository;
		listNearByGymsUseCase = new ListNearByGymsUseCase(gymsRepository);
	});

	it('should be able to list nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: null,
			phone: null,
			latitude: -23.4506127,
			longitude: -46.5451525,
		});

		await gymsRepository.create({
			title: 'Far Gym',
			description: null,
			phone: null,
			latitude: -23.1893004,
			longitude: -46.9327692,
		});


		const { gyms } = await listNearByGymsUseCase.execute({
			userLatitude: -23.4506127,
			userLongitude: -46.5451525,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
	});

});