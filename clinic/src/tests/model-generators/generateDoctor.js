import { faker } from '@faker-js/faker';
import generateUserData from './generateUserData.js';

const generateDoctor = () => {
	const userData = generateUserData();
	const len = faker.number.int({ min: 2, max: 10 });
	const availableSlots = [];
	for(let i=0 ; i<len ; i++){
		availableSlots.push(faker.date.anytime());
	}
	const wallet = {
		amount: faker.number.int({ min: 1, max: 10000 }), 
	};
	return {
		userData,
		speciality: faker.lorem.word({ length: { min: 5, max: 8 } }),
		hourlyRate: faker.number.int({ min: 20, max: 1000 }),
		affiliation: faker.company.name(),
		educationalBackground: faker.lorem.sentence({ min: 3, max: 10 }),
		availableSlots,
		wallet,

	};
};

export default generateDoctor;