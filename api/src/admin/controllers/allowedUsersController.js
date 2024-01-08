import { generateAuthToken } from '../helpers/jwtFunctions.js'
import {
    addOneUser,
    deleteUser,
    findAllowedUsers,
} from '../queries/allowedUsersQueries.js'

export const loginAdmin = async (ctx) => {
    const response = {}

    if (ctx.request.body.password !== process.env.PASSKEY) {
        response.success = false
        response.reason = 'Wrong password'
        response.message = 'Something went wrong'
    } else {
        const token = generateAuthToken()
        ctx.cookies.set('myToken', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, //60 minutes
            path: '/',
            overwrite: true,
        })
        response.success = true
        response.data = 'ok'
        response.message = 'data displayed successfully.'
    }

    ctx.body = response
}

// export const getUsers = async (ctx) => {
//     try {
//         const page = parseInt(ctx.query.page)
//         const perPage = parseInt(ctx.query.perPage)
//         let sortOptions = {}

//         if (ctx.query.sortBy && ctx.query.sortOrder) {
//             const sortOrder =
//                 ctx.query.sortOrder.toLowerCase() === 'desc' ? -1 : 1
//             sortOptions[ctx.query.sortBy] = sortOrder
//         }

//         const results = await findAllowedUsers(page, perPage, sortOptions)
//         ctx.status = 200
//         ctx.body = results
//     } catch (err) {
//         ctx.status = 500
//         ctx.body = { error: err }
//     }
// }

export const getUsers = async (ctx) => {
    const response = {}

    try {
        let sortOptions = {}
        const { sortBy, sortOrder, page, perPage } = ctx.query

        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1
        }

        const results = await findAllowedUsers(
            parseInt(page),
            parseInt(perPage),
            sortOptions
        )

        response.success = true
        response.data = results
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }

    ctx.body = response
}
export const getUser = async (ctx) => {
    const response = {}
    response.success = true
    response.data = ctx.state.user
    response.message = 'data displayed successfully.'
    ctx.body = response
}

export const addUser = async (ctx) => {
    const response = {}
    try {
        const allowedUserDoc = await addOneUser(ctx.request.body.name)
        console.log(allowedUserDoc)

        if (!allowedUserDoc) {
            throw new Error('failed to add User')
        }
        response.success = true
        response.data = 'new user created'
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const removeUser = async (ctx) => {
    const response = {}
    try {
        const response = await deleteUser(ctx.params.name)
        if (response.deletedCount === 0) {
            throw new Error('User Does not Exist')
        }
        response.success = true
        response.data = 'User deleted successfully'
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}
