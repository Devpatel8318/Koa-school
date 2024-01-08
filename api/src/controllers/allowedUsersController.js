import { generateAuthToken } from '../utils/jwtFunctions.js'
import {
    addOneUser,
    deleteUser,
    findAllowedUsers,
} from '../queries/allowedUsersQueries.js'

export const loginAdmin = async (ctx) => {
    if (ctx.request.body.password !== process.env.PASSKEY) {
        ctx.status = 401
        ctx.body = {
            error: 'Wrong passkey',
        }
        return
    }
    const token = generateAuthToken()
    ctx.cookies.set('myToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000, //60 minutes
        path: '/',
        overwrite: true,
    })
    ctx.status = 200
    ctx.body = {
        message: 'ok',
    }
}

export const getUsers = async (ctx) => {
    try {
        const page = parseInt(ctx.query.page)
        const perPage = parseInt(ctx.query.perPage)
        let sortOptions = {}

        if (ctx.query.sortBy && ctx.query.sortOrder) {
            const sortOrder =
                ctx.query.sortOrder.toLowerCase() === 'desc' ? -1 : 1
            sortOptions[ctx.query.sortBy] = sortOrder
        }

        const results = await findAllowedUsers(page, perPage, sortOptions)
        ctx.status = 200
        ctx.body = results
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err }
    }
}
export const getUser = async (ctx) => {
    ctx.status = 200
    ctx.body = ctx.state.user
}

export const addUser = async (ctx) => {
    try {
        const allowedUserDoc = await addOneUser(ctx.request.body.name)

        if (!allowedUserDoc) {
            ctx.status = 500
            ctx.body = { error: 'Failed to add User' }
            return
        }
        ctx.status = 201
        ctx.body = allowedUserDoc.name
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err.message }
    }
}

export const removeUser = async (ctx) => {
    try {
        const response = await deleteUser(ctx.params.name)
        if (response.deletedCount === 0) {
            ctx.throw(404, 'User Does not Exist')
        }

        ctx.status = 200
        ctx.body = { message: 'User deleted successfully' }
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}
