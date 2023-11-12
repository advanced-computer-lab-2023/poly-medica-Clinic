import { faker } from '@faker-js/faker';

const generateHealthPackage = () => {
	return {
		price: faker.number.int({ min: 10, max: 1000 }),
		name: faker.lorem.word({ length: { min: 5, max: 10 } }),
		discountOfDoctor: faker.number.int({ min: 1, max: 100 }),
		discountOfMedicin: faker.number.int({ min: 1, max: 100 }),
		discountOfFamily: faker.number.int({ min: 1, max: 100 }),
	};
};

export default generateHealthPackage;