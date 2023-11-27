import express from 'express';
import morgan from 'morgan';
import { chat } from './src/api/ChatAPI.js';
import { message } from './src/api/MessageAPI.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.json());
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3005',
        ],
        credentials: true,
    })
);

chat(app);
message(app);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log("Connected to socket.io");

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });


  socket.on("send message", (data) => {
    console.log(data);
    socket.to(data.room).emit("recieve message",data.message);
  });

})

export default server;
