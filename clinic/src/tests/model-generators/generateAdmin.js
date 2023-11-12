import { faker } from '@faker-js/faker';

const generateAdmin = () => {
	return {
		userName: faker.internet.userName(),
		password: faker.internet.password(),
		mainAdmin: faker.datatype.boolean(),
	};
};

export default generateAdmin;
