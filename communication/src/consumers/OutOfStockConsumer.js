import KafkaNode from 'kafka-node';
import { addNotificationForUser } from '../utils/NotificationsUtils.js';
// import axios from 'axios';
// import { AUTH_BASE_URL } from '../utils/Constants.js';

export const outOfStockConsumer = async () => {
	const client = new KafkaNode.KafkaClient({ kafkaHost: 'kafka:9092' });
	const consumer = new KafkaNode.Consumer(client, [{ topic: 'out_of_stock' }]);

	consumer.on('message', async function (message) {
		console.log('message = ', message);
		const notification = JSON.parse(message.value);
		console.log('notification = ', notification);
		const type = notification.type;
		const notificationBody = notification.notification;

		const sendedData = await fetch('http://authentication:8004/pharmacists/id');
		const pharmacist = sendedData.data;

		for (let i = 0; i < pharmacist.length; i++) {
			const userId = pharmacist[i];
			await addNotificationForUser(userId, type, notificationBody);
		}
	});

	consumer.on('error', function (err) {
		console.log('error', err);
	});
};
