import { faker } from '@faker-js/faker';

const generatePrescription = (patientId, doctorId) => {
	return {
		patientId,
		doctorId,
		doctorName: faker.person.firstName(),
		date: faker.date.anytime(),
		filled: faker.datatype.boolean(),
		description: faker.lorem.paragraph(),
		medicines: [
			{
				medicineId: faker.database.mongodbObjectId(),
				dosage: faker.number.int({ min: 1, max: 10 }),
			},
		],
		price: faker.number.float({ min: 1, max: 1000 }),
	};
};

export default generatePrescription;
