import KafkaNode from 'kafka-node';

export const kafka = (app) => {
	const client = new KafkaNode.KafkaClient({
		kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
	});

	const adminConsumer = new KafkaNode.Consumer(
		client,
		[{ topic: 'admin_register_req' }],
		{
			autoCommit: false,
		},
	);

	adminConsumer.on('message', (message) => {
		const admin = JSON.parse(message.value);
		console.log('admin req in authentication: ', admin);
	});

	adminConsumer.on('error', (err) => {
		console.log('error in admin consumer: ', err);
	});
};
