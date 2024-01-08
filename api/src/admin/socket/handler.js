import { findAllowedUsersName } from '../queries/allowedUsersQueries.js'

const onlineUsers = new Map()

export const handleJoinEvent = (socket, io) => async (name, callback) => {
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
}

export const handlePrivateMessage =
    (socket, io) =>
    ({ senderId, senderName, recipientId, message }) => {
        io.to(recipientId).emit('newMessage', {
            message,
            senderId,
            senderName,
        })
    }

export const handleDisconnect = (socket, io) => () => {
    onlineUsers.delete(socket.id)
    io.emit('onlineUsers', Array.from(onlineUsers.values()))
    console.log('User disconnected')
}

export const handleBroadcast = (socket, io) => (message) => {
    io.emit('Broadcast', message)
}

export const socketHandler = (socket, io) => {
    return {
        handleJoinEvent: handleJoinEvent(socket, io),
        handlePrivateMessage: handlePrivateMessage(socket, io),
        handleDisconnect: handleDisconnect(socket, io),
        handleBroadcast: handleBroadcast(socket, io),
    }
}
