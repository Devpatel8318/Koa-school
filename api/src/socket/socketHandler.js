import { Server } from 'socket.io'
import { findAllowedUsersName } from '../queries/allowedUsersQueries.js'

const onlineUsers = new Map()

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
        },
    })

    io.on('connection', (socket) => {
        console.log('New user connected')

        socket.on('join', async (name, callback) => {
            try {
                const allowedUsersList = await findAllowedUsersName()
                const userNames = allowedUsersList.map((user) => user.name)

                if (!userNames.includes(name)) {
                    callback({ error: 'Name is not allowed' })
                    return
                }

                onlineUsers.set(socket.id, name)
                callback({ socketId: socket.id })
                io.emit('onlineUsers', Array.from(onlineUsers))
            } catch (error) {
                console.error('Error:', error)
                callback({ error: 'Error processing request' })
            }
        })

        socket.on(
            'privateMessage',
            ({ senderId, senderName, recipientId, message }) => {
                io.to(recipientId).emit('newMessage', {
                    message,
                    senderId,
                    senderName,
                })
            }
        )

        socket.on('disconnect', () => {
            onlineUsers.delete(socket.id)
            io.emit('onlineUsers', Array.from(onlineUsers.values()))
            console.log('User disconnected')
        })

        socket.on('sendBroadcast', (message) => {
            io.emit('Broadcast', message)
        })
    })
}

export default initializeSocket
