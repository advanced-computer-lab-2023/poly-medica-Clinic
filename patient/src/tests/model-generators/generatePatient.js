import { faker } from '@faker-js/faker';
import { FAMILIY_EMERGENCY, GENDERS } from '../../utils/Constants';

const generatePatient = () => {
    return {
        name: faker.person.firstName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dateOfBirth: faker.date.birthdate(),
        gender: faker.helpers.arrayElement(GENDERS),
        mobileNumber: faker.phone.number(),
        emergencyContact: {
            relation: faker.helpers.arrayElement(FAMILIY_EMERGENCY),
            mobile: faker.phone.number(),
            name: faker.person.firstName
        }
    };
};

export default generatePatient;
