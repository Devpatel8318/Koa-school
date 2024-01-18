import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { config } from 'dotenv'
import { createServer } from 'http'

import initializeSocket from './socket/socket.js'
import allowedUsers from './routers/allowedUsers.js'

config()
const app = new Koa()
const httpServer = createServer(app.callback())

const port = process.env.ADMIN_PORT || 8000

// Middlewares
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = {
            message: err.message,
        }
    }
})

app.use(
    bodyParser({
        enableTypes: ['json'],
        onerror(err, ctx) {
            const error = new Error('Invalid Body')
            error.status = 422
            throw error
        },
    })
)

app.use(allowedUsers.routes())

app.use(async (ctx) => {
    ctx.status = 404
    ctx.body = { message: 'Route does not exist.' }
})

initializeSocket(httpServer)

httpServer.listen(port, () => console.log('ADMIN Server is up on port ' + port))
