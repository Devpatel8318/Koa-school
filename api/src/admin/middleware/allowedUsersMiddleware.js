import { isTokenValid } from '../helpers/jwtFunctions.js'
import { failureObject } from '../../utils/responseObject.js'

export const auth = async (ctx, next) => {
    if (isTokenValid(ctx.cookies.get('myToken'))) {
        await next()
    } else {
        ctx.body = failureObject('unauthorized')
    }
}
