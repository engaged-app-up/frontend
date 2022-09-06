import { io } from 'socket.io-client';

const socket = io('http://localhost:3001')

socket.on('connect', () => {
    displaymessage(`You connected with id: ${socket.id}`)
})