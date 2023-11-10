import { faker } from '@faker-js/faker';
import { FAMILIY_EMERGENCY, FAMILY_RELATIONS, GENDERS, ONE } from '../../utils/Constants.js';

const generateGender = () => {
    const genderIdx = faker.number.int({ min: 0, max: GENDERS.length - ONE });
    return GENDERS[genderIdx];
};

const generateRelation = () => {
    const relationIdx = faker.number.int({
        min: 0,
        max: FAMILIY_EMERGENCY.length - ONE,
    });
    return FAMILIY_EMERGENCY[relationIdx];
};

const generateFamilyMemberRelation = () => {
    const relationIdx = faker.number.int({
        min: 0,
        max: FAMILY_RELATIONS.length - ONE,
    });
    return FAMILY_RELATIONS[relationIdx];
}

const generateFamilyMember = () => {
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        nationalId: faker.string.uuid(),
        age: faker.number.int({ min: 2, max: 90 }),
        gender: generateGender(),
        relation: generateFamilyMemberRelation(),
    };
};

const generateHealthrecord = () => {
    return {
        healthIssue: faker.lorem.words({ min: 1, max: 5 }),
        healthIssueDate: faker.date.anytime(),
        healthIssueDescription: faker.lorem.paragraph({ min: 2, max: 5 }),
    };
};

const generateAddress = () => {
    return {
        city: faker.lorem.words({ min: 1, max: 5 }),
        street: faker.lorem.words({ min: 1, max: 5 }),
        buildingName: faker.lorem.words({ min: 10, max: 20 }),
        phoneNumber: faker.phone.imei(),
        primary: false,
    };
};

const generatePatient = () => {
    const familyMembersLen = faker.number.int({ min: 2, max: 10 });
    const familyMembers = [];
    for (let i = 0; i < familyMembersLen; i++) {
        familyMembers.push(generateFamilyMember());
    }
    const healthrecordsLen = faker.number.int({ min: 2, max: 10 });
    const healthrecords = [];
    for (let i = 0; i < healthrecordsLen; i++) {
        healthrecords.push(generateHealthrecord());
    }
    const deliveryAddressesLen = faker.number.int({ min: 2, max: 10 });
    const deliveryAddresses = [];
    for (let i = 0; i < deliveryAddressesLen; i++) {
        deliveryAddresses.push(generateAddress());
    }
    return {
        name: faker.person.firstName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dateOfBirth: faker.date.birthdate(),
        gender: generateGender(),
        mobileNumber: faker.phone.number(),
        emergencyContact: {
            name: faker.person.firstName(),
            mobile: faker.phone.number(),
            relation: generateRelation(),
        },
        familyMembers,
        healthrecords,
        deliveryAddresses,
    };
};

export default generatePatient;
