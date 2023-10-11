import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { admin } from './src/api/AdminAPI.js';
import { healthPackage } from './src/api/HealthPackageAPI.js';
import { doctor } from './src/api/DoctorAPI.js';
import { PORT } from './src/utils/Constants.js';
import cors from 'cors';
import { appointment } from './src/api/AppointmentAPI.js';

dotenv.config();
const app = express();

const mongoURL = process.env.MONGO_URI;
console.log(mongoURL);

const connect = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Database connected');
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
    }
};

await connect();

app.use(express.json());
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
        ],
        credentials: true,
    })
);

healthPackage(app);
admin(app);
doctor(app);
appointment(app);

const port = process.env.PORT || PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
