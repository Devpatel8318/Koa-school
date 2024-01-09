import { successObject, failureObject } from '../../utils/responseObject.js'

import * as allowedUsersQueries from '../queries/allowedUsersQueries.js'

import { generateAuthToken } from '../helpers/jwtFunctions.js'

export const loginAdmin = async (ctx) => {
    let response = {}
    const { password } = ctx.request.body

    if (password !== process.env.PASSKEY) {
        response = failureObject('Wrong pasword')
    } else {
        ctx.cookies.set('myToken', generateAuthToken(), {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, //60 minutes
            path: '/',
            overwrite: true,
        })
        response = successObject('ok')
    }

    ctx.body = response
}

export const getUsers = async (ctx) => {
    let response = {}

    try {
        let sortOptions = {}
        const { sortBy, sortOrder, page, perPage } = ctx.query

        if (sortBy && sortOrder)
            sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1

        const allowedUsers = await allowedUsersQueries.findAllowedUsers(
            parseInt(page),
            parseInt(perPage),
            sortOptions
        )

        response = successObject(allowedUsers)
    } catch (err) {
        response = failureObject(err.message)
    }

    ctx.body = response
}
export const getUser = async (ctx) => {
    const { user } = ctx.state
    ctx.body = successObject(user)
}

export const addUser = async (ctx) => {
    let response = {}
    const { name } = ctx.request.body
    try {
        const allowedUserDoc = await allowedUsersQueries.addOneUser(name)

        if (!allowedUserDoc) throw new Error('failed to add User')

        response = successObject('new user created')
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}

export const removeUser = async (ctx) => {
    let response = {}
    const { name } = ctx.params
    try {
        const res = await allowedUsersQueries.deleteUser(name)
        if (!res.deletedCount) {
            throw new Error('User Does not Exist')
        }

        response = successObject('User deleted successfully')
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}
