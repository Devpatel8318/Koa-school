import { successObject } from '../../utils/responseObject.js'

import * as allowedUsersQueries from '../queries/allowedUsersQueries.js'

import { generateAuthToken } from '../helpers/jwtFunctions.js'
import formatName from '../helpers/formatName.js'

export const loginAdmin = async (ctx) => {
    ctx.cookies.set('myToken', generateAuthToken(), {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000, //60 minutes
        path: '/',
        overwrite: true,
    })
    ctx.body = successObject('ok')
}

export const getUsers = async (ctx) => {
    let sortOptions = {}
    const { sortBy, sortOrder, page, perPage } = ctx.query

    if (sortBy && sortOrder)
        sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1

    const allowedUsers = await allowedUsersQueries.getAllAllowedUsers(
        parseInt(page),
        parseInt(perPage),
        sortOptions
    )

    ctx.body = successObject(allowedUsers)
}
export const getUser = async (ctx) => {
    const { user } = ctx.state
    ctx.body = successObject(user)
}

export const addUser = async (ctx) => {
    const { name } = ctx.request.body

    await allowedUsersQueries.addOneUser(formatName(name))

    ctx.body = successObject('new user created.')
}

export const removeUser = async (ctx) => {
    const { name } = ctx.params

    await allowedUsersQueries.deleteUser(formatName(name))

    ctx.body = successObject('User deleted successfully.')
}
