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
	console.log('Connected to socket.io');

	socket.on('setup', (userId) => {
		console.log('Room created with id  = ', userId);
		socket.join(userId);
	});

	socket.on('join_room', (room) => {
		console.log('room = ', room);
		console.log('Another guy joined !!');
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

	socket.on('call_user', ({ userToCall, signalData, from, name }) => {
		console.log('YOU ARE CALLING A USER: ', userToCall);
		console.log('the call is from: ', from);
		socket.to(userToCall).emit('call_user', { signal: signalData, from, name });
	});

	socket.on('answer_call', (data) => {
		console.log('the called user : ', data.to);
		console.log('is there from? ', data.from);
		socket.to(data.to).emit('call_answered', data.signal);
	});
});

export default server;
