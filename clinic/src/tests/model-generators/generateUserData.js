import { faker } from '@faker-js/faker';

const generateUserData = () => {
	return {
		name: faker.person.firstName(),
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		dateOfBirth: faker.date.birthdate()
	};
};

export default generateUserData;