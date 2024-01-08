import { isTokenValid } from '../helpers/jwtFunctions.js'

export const auth = async (ctx, next) => {
    if (isTokenValid(ctx.cookies.get('myToken'))) {
        await next()
    } else {
        const response = {}
        response.success = false
        response.reason = 'unauthorized'
        response.message = 'Something went wrong'
        ctx.body = response
    }
}
