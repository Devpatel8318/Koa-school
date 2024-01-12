import { failureObject } from '../../utils/responseObject.js'
import { isTokenValid } from '../helpers/jwtFunctions.js'

const auth = async (ctx, next) => {
    if (!isTokenValid(ctx.cookies.get('myToken'))) {
        ctx.status = 401
        ctx.body = failureObject('unauthorized', 'Permission denied.')
        return
    }

    await next()
}

export default auth
