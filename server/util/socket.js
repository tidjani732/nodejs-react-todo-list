import socket from 'socket.io';
let io;
let num = 100;

export function socketInit(server) {
    io = socket(server);
    num = 4567890;
    return io;
}

export function getSocket() {
    if (io) return io;
    throw new Error('Socket not initialized!');
}

export function getNum() {
    return num;
}

export default socket;
