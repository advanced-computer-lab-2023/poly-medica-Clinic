import { faker } from '@faker-js/faker';
import { FAMILIY_EMERGENCY, GENDERS } from '../../utils/Constants.js';
const ONE = 1;

const generateGender = () => {
	const genderIdx = faker.number.int({ min: 0, max: GENDERS.length - ONE });
	return GENDERS[genderIdx];
};

const generateRelation = () => {
	const relationIdx = faker.number.int({ min: 0, max: FAMILIY_EMERGENCY.length - ONE });
	return FAMILIY_EMERGENCY[relationIdx];
};

const generateFamilyMember = () => {
	return {
		id: faker.database.mongodbObjectId(),
		name: faker.person.firstName(),
		nationalId: faker.string.uuid(),
		age: faker.number.int({ min: 2, max: 90 }),
		gender: generateGender(),
		relation: generateRelation()
	};
};

const generateHealthrecord = () => {
	return {
		healthIssue: faker.lorem.words({ min: 1, max: 5 }),
		healthIssueDate: faker.date.anytime(),
		healthIssueDescription: faker.lorem.paragraph({ min: 2, max: 5 })
	};
};

const generatePatient = () => {
	const familyMembersLen = faker.number.int({ min: 2, max: 10 });
	const familyMembers = [];
	for(let i=0 ; i<familyMembersLen ; i++){
		familyMembers.push(generateFamilyMember());
	}
	const healthrecordsLen = faker.number.int({ min: 2, max: 10 });
	const healthrecords = [];
	for(let i=0 ; i<healthrecordsLen ; i++){
		healthrecords.push(generateHealthrecord());
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
			relation: generateRelation()
		},
		familyMembers,
		healthrecords
	};
};

export default generatePatient;