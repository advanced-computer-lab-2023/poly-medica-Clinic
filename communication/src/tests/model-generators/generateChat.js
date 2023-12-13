import { faker } from '@faker-js/faker';

const generateChat = () => {
	return {
		chatName : faker.lorem.words({ min: 1, max: 5 }),
		users : [
			{
				id : faker.database.mongodbObjectId(),
				type : faker.lorem.words({ min: 1, max: 5 }),
			},
			{
				id : faker.database.mongodbObjectId(),
				type : faker.lorem.words({ min: 1, max: 5 }),
			},
		],    
		lastMessage: faker.database.mongodbObjectId(),
	};
};

export default generateChat;
