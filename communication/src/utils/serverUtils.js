import io from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

export const socket = io(`http://localhost:${process.env.PORT}`);