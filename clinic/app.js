import express from 'express';

import { admin } from './src/api/AdminAPI.js';
import { healthPackage } from './src/api/HealthPackageAPI.js';
import { doctor } from './src/api/DoctorAPI.js';
import { doctorRequests } from './src/api/DoctorRequestsAPI.js';
import cors from 'cors';
import { appointment } from './src/api/AppointmentAPI.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import { default as swaggerFile } from './src/swagger/swagger.json' assert { type: "json" };


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: [
			'http://192.168.56.1/3000',
			'http://localhost:3000',
			'http://localhost:3001',
			'http://localhost:3002',
		],
		credentials: true,
	}),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

healthPackage(app);
admin(app);
doctor(app);
doctorRequests(app);
appointment(app);

export default app;