import KafkaNode from 'kafka-node';
import {
	APPOINTMENT_NOTIFICATION_TYPE_ENUM,
	ERROR_STATUS_CODE,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

const client = new KafkaNode.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new KafkaNode.Producer(client);

const appointmentProducer = (app) => {
	const kafka_topic = 'notifications';

	producer.on('ready', function () {
		console.log('Appointment producer is ready');
	});

	producer.on('error', function (err) {
		console.log('Appointment producer is in error state');
		console.log(err);
	});

	const sendAppointmentNotification = async (userId, appointment) => {
		const payload = [
			{
				topic: kafka_topic,
				messages: JSON.stringify({
					userId: userId,
					type: APPOINTMENT_NOTIFICATION_TYPE_ENUM,
					notification: appointment,
				}),
			},
		];

		producer.send(payload, (err, data) => {
			console.log('payloads = ', payload);
			console.log('data = ', data);
			if (err) {
				console.log(
					'[kafka-producer -> ' + kafka_topic + ']: broker update failed',
				);
			} else {
				console.log(
					'[kafka-producer -> ' + kafka_topic + ']: broker update success',
				);
			}
		});
	};

	app.post('/appointments/:userId', async (req, res) => {
		try {
			const userId = req.params.userId;
			const appointment = req.body;
			await sendAppointmentNotification(userId, appointment);
			res.status(OK_STATUS_CODE).send();
		} catch (err) {
			console.log(err);
			res.status(ERROR_STATUS_CODE).send();
		}
	});
};

export { appointmentProducer, producer };
