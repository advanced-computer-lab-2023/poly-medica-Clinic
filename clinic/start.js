import kafka from 'kafka-node';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import { PORT } from './src/utils/Constants.js';

dotenv.config();

const mongoURL = process.env.MONGO_URI;
console.log(mongoURL);

const connect = async () => {
	try {
		await mongoose.connect(mongoURL);
		console.log('Database connected', mongoURL);
	} catch (err) {
		console.error('Error connecting to the database:', err.message);
	}
};

await connect();

const isRunning = () => {
	const testModel = mongoose.model(
		'test',
		new mongoose.Schema({ name: String }),
	);

	const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
	console.log('Kafka client connected: ', client);

	const consumer = new kafka.Consumer(client, [
		{ topic: 'test', autoCommit: false },
	]);

	consumer.on('message', async (message) => {
		console.log('Message received: ', message);
		const test = await testModel.create({ name: message.value });
		console.log('Test created: ', test);
	});

	consumer.on('error', (err) => {
		console.log('Error: ', err);
	});
};

const TIME = 3000;
setTimeout(isRunning, TIME);

const port = process.env.PORT || PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
