import { findUserByName } from '../queries/allowedUsersQueries.js'
import { isTokenValid } from '../utils/jwtFunctions.js'

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
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const auth = async (ctx, next) => {
    if (isTokenValid(ctx.cookies.get('myToken'))) {
        await next()
    } else {
        ctx.status = 401
        ctx.body = {
            error: 'unauthorized',
        }
    }
}
