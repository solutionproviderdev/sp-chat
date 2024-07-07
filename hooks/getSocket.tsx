import { io } from 'socket.io-client';

let socket;

export const connectSocket = () => {
	const socketUrl =
		process.env.REACT_APP_API_SOCKET || 'http://192.168.68.111:5000';

	socket = io(socketUrl, {
		path: '/socket.io',
		reconnectionDelay: 1000,
		reconnection: true,
		reconnectionAttempts: 10,
		transports: ['websocket'],
		agent: false,
		upgrade: false,
		rejectUnauthorized: false,
	});

	return socket;
};

export const getSocket = () => connectSocket();
