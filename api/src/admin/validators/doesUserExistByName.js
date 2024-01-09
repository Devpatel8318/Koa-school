import * as allowedUsersQueries from '../queries/allowedUsersQueries.js'

export const doesUserExistByName = async (ctx, next) => {
    const { name } = ctx.params
    try {
        const user = await allowedUsersQueries.getUserByName(name)
        if (!user) {
            ctx.throw(404, 'User Not Found')
        } else {
            ctx.state.user = user
            await next()
        }
    } catch (err) {
        ctx.body = {
            success: false,
            reason: err.message,
            message: 'Something went wrong',
        }
    }
}
