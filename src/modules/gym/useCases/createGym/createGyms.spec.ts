import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '../../repositories/InMemoryRepository/inMemoryGymsRepository';
import { CreateGymUseCase } from './createGymUseCase';

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository;
		createGymUseCase = new CreateGymUseCase(gymsRepository);
	});

	it('should be able to create a gym', async () => {

		const { gym } = await createGymUseCase.execute({
			title: 'Gym 1',
			description: null,
			phone: null,
			latitude: -23.4506127,
			longitude: -46.5451525,
		});

		expect(gym.id).toEqual(expect.any(String));
	});

});