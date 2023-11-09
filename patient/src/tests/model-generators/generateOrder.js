import { faker } from '@faker-js/faker';
import { ORDER_STATUS, ZERO_INDEX, ONE } from '../../utils/Constants.js';

const generateItem = () => {
    return {
        name: faker.lorem.words({ min: 5, max: 10 }),
        price: faker.number.int({ min: 3, max: 10 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
    };
};

const generateOrder = (patientId) => {
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
        status: ORDER_STATUS[ZERO_INDEX],
    };
};

export default generateOrder;
