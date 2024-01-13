import express from 'express';
import { patient } from './src/api/PatientAPI.js';
import { order } from './src/api/OrderAPI.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { checkUser } from './src/middleware/authMiddleware.js';
import cors from 'cors';
import { prescription } from './src/api/PrescriptionAPI.js';
import swaggerUi from "swagger-ui-express";
import { default as swaggerFile } from './src/swagger/swagger.json' assert { type: "json" };


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(cors({
	origin: ['http://localhost:3000','http://localhost:3001', 'http://localhost:3002'],
	credentials: true
}));

app.use('*', checkUser);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

patient(app);
order(app);
prescription(app);

export default app;