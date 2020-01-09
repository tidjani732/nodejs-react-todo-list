import openSocket from 'socket.io-client';
import { sessionService } from '../services/session.service';

let socket;
export function initSocket() {
    const token = sessionService.getSessionToken();
    socket = openSocket("http://localhost:3001", { uid: token })
    return socket
}

export function getSocket() {
    if (socket) return socket;
    else return initSocket();
}
