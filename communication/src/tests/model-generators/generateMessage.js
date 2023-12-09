import { faker } from '@faker-js/faker';

const generateMessage = () => {
	return {
		chatId: faker.database.mongodbObjectId(),
		sender: faker.database.mongodbObjectId(),
		reciever: faker.database.mongodbObjectId(),
		content: faker.lorem.sentence(),

	};
};

export default generateMessage;
