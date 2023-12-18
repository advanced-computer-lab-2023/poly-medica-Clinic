import express from 'express';
import morgan from 'morgan';
import { chat } from './src/api/ChatAPI.js';
import { message } from './src/api/MessageAPI.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import { notification } from './src/api/NotificationAPI.js';
import UserSocketModel from './src/database/models/UserSocket.js';

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
	console.log('socketid: ', socket.id);

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

	socket.on('message_seen', (data) => {
		console.log(data);
		data.chat.users.map((user) => {
			if (user.id !== data.sender)
				socket.to(user.id).emit('update_chat_seen', {
					chat: data.chat,
				});
		});
	socket.on('ready', async ({ userId }) => {
		try {
			console.log('inside ready with id = ', userId);
			const userSockets = await UserSocketModel.findOne({ userId: userId.toString() });
			if (userSockets) {
				userSockets.socketId = socket.id;
				userSockets.save();
			}
			else {
				const newUser = { userId: userId, socketId: socket.id };
				const newUserSocket = new UserSocketModel(newUser);
				newUserSocket.save();
			}
			socket.emit("me", socket.id);

		} catch (err) {
			console.log('err: ', err.message);
		}
	});

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
	});

	socket.on("callUser", async ({ userToCall, signalData, from, name }) => {
		console.log('called user succeessfully');
		const userSocketId = await UserSocketModel.findOne({ userId: userToCall });
		io.to(userSocketId.socketId).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		console.log('inside answer call');
		io.to(data.to).emit('hello');
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

export default server;
