import { Server } from 'socket.io'

import { socketHandler } from './handler.js'

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
        },
    })

    io.on('connection', (socket) => {
        const {
            handleBroadcast,
            handleDisconnect,
            handleJoinEvent,
            handlePrivateMessage,
        } = socketHandler(socket, io)

        console.log('New user connected')

        socket.on('join', handleJoinEvent)

        socket.on('privateMessage', handlePrivateMessage)

        socket.on('sendBroadcast', handleBroadcast)

        socket.on('disconnect', handleDisconnect)
    })
}

export default initializeSocket
