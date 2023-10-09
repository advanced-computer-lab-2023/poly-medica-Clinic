import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { patient } from './src/api/PatientAPI.js';
import { PORT_NUMBER } from './src/utils/Constants.js';
import cors from 'cors';

dotenv.config();
const app = express();

const mongoURL = process.env.MONGO_URI;

const connect = async () => {
	try {
		await mongoose.connect(mongoURL);
		console.log('Database connected');
	} catch (err) {
		console.error('Error connecting to the database:', err);
	}
};

await connect();

app.use(express.json());
app.use(cors({
	origin: ['http://localhost:3000','http://localhost:3001', 'http://localhost:3002'],
	credentials: true
}));

patient(app);

const port = process.env.PORT || PORT_NUMBER;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
