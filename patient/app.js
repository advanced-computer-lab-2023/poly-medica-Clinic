import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { patient } from './src/api/PatientAPI.js';
import { PORT_NUMBER } from './src/utils/Constants.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { checkUser } from './src/middleware/authMiddleware.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

app.use('*', checkUser);

patient(app);

const port = process.env.PORT || PORT_NUMBER;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

