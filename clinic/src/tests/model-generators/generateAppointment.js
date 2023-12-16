import { faker } from '@faker-js/faker';

const generateAppointment = (patientId, doctorId) => {
	return {
		patientId,
		doctorId,
		patientName: faker.person.firstName(),
		doctorName: faker.person.firstName(),
		date: faker.date.anytime(),
		status: faker.lorem.word({ length: { min: 5, max: 8 } }),
		type: 'appointment',
		pricePaidByPatient: parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 })),
		pricePaidToDoctor: parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 }))
	};
};

export default generateAppointment;