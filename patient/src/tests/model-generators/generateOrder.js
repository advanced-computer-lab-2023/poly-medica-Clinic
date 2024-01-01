import { faker } from '@faker-js/faker';

const generateItem = () => {
	return {
		medicineId: faker.database.mongodbObjectId(),
		name: faker.lorem.words({ min: 5, max: 10 }),
		price: faker.number.int({ min: 3, max: 10 }),
		quantity: faker.number.int({ min: 1, max: 10 }),
	};
};

const generateOrder = (patientId, orderStatus) => {
	const details = [];
	const len = faker.number.int({ min: 5, max: 10 });
	let total = 0;
	for (let i = 0; i < len; i++) {
		const item = generateItem();
		details.push(item);
		total += item.quantity * item.price;
	}
	return {
		patientId: patientId,
		details,
		amount: total,
		status: orderStatus,
		paymentMethod: 'credit card',
	};
};

export default generateOrder;
