import { faker } from '@faker-js/faker';

const generatePrescription = (patientId, doctorId) => {
	return {
		patientId,
		doctorId,
		patientName: faker.person.firstName(),
		doctorName: faker.person.firstName(),
		date: faker.date.anytime(),
		filled: faker.datatype.boolean(),
		description: faker.lorem.paragraph()
	};
};

export default generatePrescription;