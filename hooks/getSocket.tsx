// import { io } from 'socket.io-client';

// let socket;

// export const connectSocket = () => {
// 	const socketUrl =
// 		process.env.REACT_APP_API_SOCKET || 'http://192.168.68.111:5000';

// 	socket = io(socketUrl, {
// 		path: '/socket.io',
// 		reconnectionDelay: 1000,
// 		reconnection: true,
// 		reconnectionAttempts: 10,
// 		transports: ['websocket'],
// 		agent: false,
// 		upgrade: false,
// 		rejectUnauthorized: false,
// 	});

// 	return socket;
// };

// export const getSocket = () => connectSocket();

// ## new socket code
import io from 'socket.io-client';

let socket;

export const getSocket = () => {
	if (!socket) {
		socket = io('http://192.168.0.112:3000'); // Replace with your server URL
	}
	return socket;
};
