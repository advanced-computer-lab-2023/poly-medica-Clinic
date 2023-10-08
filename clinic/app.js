import morgan from 'morgan';
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AdminAPI } from "./src/api/AdminAPI.js"
import { DoctorAPI } from "./src/api/DoctorAPI.js"
import { healthPackage } from './src/api/HealthPackageAPI.js';
import { MONGO_URI, PORT } from './src/utils/Constants.js';
import { checkUser } from './src/middleware/authMiddleware.js';


dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = process.env.MONGO_URI || MONGO_URI;

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
app.use('*', checkUser);

healthPackage(app);
AdminAPI(app);
DoctorAPI(app);
//appointment(app);

const port = process.env.PORT || PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});