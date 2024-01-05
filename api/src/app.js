import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { config } from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'

import studentRouter from './routers/student.js'
import subjectRouter from './routers/subject.js'
import resultRouter from './routers/result.js'
import allowedUsers from './routers/allowedUsers.js'
import { findAllowedUsersName } from './queries/allowedUsersQueries.js'

config()
const app = new Koa()
const httpServer = createServer(app.callback())
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

const port = process.env.PORT || 8000

// Middlewares
app.use(
    cors({
        // origin:
        origin: 'http://localhost:3000',
        credentials: true,
    })
)
app.use(bodyParser())

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.log()
        ctx.status = err.status || 500
        ctx.body = {
            message: err.message,
        }
    }
})

app.use(studentRouter.routes())
app.use(subjectRouter.routes())
app.use(resultRouter.routes())
app.use(allowedUsers.routes())

app.use(async (ctx) => {
    ctx.status = 404
    ctx.body = { message: 'Route does not exist' }
})

//socket.io logic
const onlineUsers = new Map()

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('join', async (name, callback) => {
        try {
            const allowedUsers = await findAllowedUsersName()
            const userNames = allowedUsers.map((user) => user.name)

            if (!userNames.includes(name)) {
                callback({ error: 'Name is not allowed' })
                return
            }

            onlineUsers.set(socket.id, name)
            callback({ socketId: socket.id })
            io.emit('onlineUsers', Array.from(onlineUsers))
        } catch (error) {
            console.error('Error:', error)
            // Handle error if any
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

httpServer.listen(port, () => console.log('Server is up on port ' + port))
