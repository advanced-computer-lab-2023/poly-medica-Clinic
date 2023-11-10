import { faker } from '@faker-js/faker';

const generateUser = (userId, email, userName, type, password) =>{
    return {
        userId,
        email,
        userName,
        password: password? password: faker.internet.password(),
        type
    }
}

export default generateUser;