import { faker } from '@faker-js/faker';
import generateUserData from './generateUserData.js';

const generateDoctor = () => {
	const userData = generateUserData();
	const len = faker.number.int({ min: 2, max: 10 });
	const availableSlots = [];
	for(let i=0 ; i<len ; i++){
		availableSlots.push({
			from: faker.date.anytime(),
			until: faker.date.anytime(),
		});
	}
	return {
		userData,
		speciality: faker.lorem.word({ length: { min: 5, max: 8 } }),
		hourlyRate: faker.number.int({ min: 20, max: 1000 }),
		affiliation: faker.company.name(),
		educationalBackground: faker.lorem.sentence({ min: 3, max: 10 }),
		availableSlots
	};
};

export default generateDoctor;