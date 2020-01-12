import socket from 'socket.io';
let io;

export function socketInit(server) {
    io = socket(server);
    return io;
}

export function getSocket() {
    if (io) return io;
    throw new Error('Socket not initialized!');
}

export default socket;
