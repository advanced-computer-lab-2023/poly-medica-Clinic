import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { clinic } from "./api/clinic.js";



dotenv.config();
const app = express();

const mongoURL = process.env.MONGO_URI;

const connect = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Database connected");
    } catch (err) {
        console.error("Error connecting to the database:", err); 
        process.exit(1); 
    }
};

await connect();

app.use(express.json());

clinic(app);

const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});