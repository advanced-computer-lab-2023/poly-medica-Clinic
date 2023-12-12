import { faker } from '@faker-js/faker';


const generateNotification = () => {
    return {
        notificationHead: faker.lorem.words(),
        notificationBody: faker.lorem.sentences()
    }
}

export default generateNotification;