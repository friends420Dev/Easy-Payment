import io, { Socket } from 'socket.io-client';
import config from '../../src/config/app.config';
// export const connectToSocket = (url: string, eventName: string, callback: (data: any) => void) => {
//     const socket = io(config.apiURL);

//     socket.on('connection', () => {
//         console.log('Connected to Socket.IO server', Socket);
//     });

//     socket.on(eventName, (data: any) => {
//         callback(data);
//     });

//     socket.on('disconnect', () => {
//         console.log('Disconnected from Socket.IO server');
//     });
//     return socket;
// }
