import { faker } from '@faker-js/faker';
import { GENDERS } from '../../utils/Constants';

const generatePatient = () => {
    return {
        name: faker.person.firstName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dateOfBirth: faker.date.birthdate(),
        gender: faker.random.arrayElement(GENDERS),
        mobileNumber: faker.phone.phoneNumber(),
    };
};

export default generatePatient;
