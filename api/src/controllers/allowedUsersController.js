import {
    addOneUser,
    deleteUser,
    findAllowedUsers,
} from '../queries/allowedUsersQueries.js'

export const getUsers = async (ctx) => {
    try {
        const results = await findAllowedUsers()
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
        console.log(ctx.request.body.name)
        const allowedUserDoc = await addOneUser(ctx.request.body.name)

        if (!allowedUserDoc) {
            ctx.status = 500
            ctx.body = { error: 'Failed to add User' }
            return
        }
        ctx.status = 201
        ctx.body = allowedUserDoc.name
    } catch (err) {
        console.log(err)
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
