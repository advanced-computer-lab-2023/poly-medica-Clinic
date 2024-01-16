import KafkaNode from 'kafka-node';
import { addNotificationForUser } from '../utils/NotificationsUtils.js';

export const appointmentConsumer = async () => {
	const client = new KafkaNode.KafkaClient({ kafkaHost: 'localhost:9092' });
	const consumer = new KafkaNode.Consumer(client, [{ topic: 'notifications' }]);

	consumer.on('message', async function (message) {
		console.log('message = ', message);
		const notification = JSON.parse(message.value);
		console.log('notification = ', notification);
		const userId = notification.userId;
		const type = notification.type;
		const notificationBody = notification.notification;
		console.log('notificationBody = ', notificationBody);
		await addNotificationForUser(userId, type, notificationBody);
	});

	consumer.on('error', function (err) {
		console.log('error', err);
	});
};
