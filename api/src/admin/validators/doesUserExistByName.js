import { findUserByName } from '../queries/allowedUsersQueries.js'
export const doesUserExistByName = async (ctx, next) => {
    try {
        const user = await findUserByName(ctx.params.name)
        if (!user) {
            ctx.throw(404, 'User Not Found')
        } else {
            ctx.state.user = user
            await next()
        }
    } catch (err) {
        const response = {}
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
        ctx.body = response
    }
}
