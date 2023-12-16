import express from 'express';
import morgan from 'morgan';
import { chat } from './src/api/ChatAPI.js';
import { message } from './src/api/MessageAPI.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import { notification } from './src/api/NotificationAPI.js';

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
notification(app);

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3000', 'http://localhost:3001'],
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log('Connected to socket.io');

	socket.on('setup', (userId) => {
		socket.join(userId);
	});

	socket.on('update notifications', (userId) => {
		console.log(' emiting event ', userId);
		socket.to(userId).emit('new notification', null);
	});

	socket.on('join_room', (room) => {
		socket.join(room);
	});

	socket.on('leave_room', (room) => {
		socket.leave(room);
	});

	socket.on('send_message', (data) => {
		data.selectedChat.users.map((user) => {
			if (user.id !== data.userId)
				socket.to(user.id).emit('receive_message', data);
		});
	});
});

export default server;
