import { faker } from '@faker-js/faker';

const generateUserData = (patientId, doctorId) => {
	return {
		patientId,
		doctorId,
		patientName: faker.person.firstName(),
		doctorName: faker.person.firstName(),
		date: faker.date.anytime(),
		status: faker.lorem.word({ length: { min: 5, max: 8 } })
	};
};

export default generateUserData;