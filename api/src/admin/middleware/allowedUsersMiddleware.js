import { isTokenValid } from '../helpers/jwtFunctions.js'

export const auth = async (ctx, next) => {
    if (isTokenValid(ctx.cookies.get('myToken'))) {
        return null
    } else {
        return 'unauthorized'
    }
}
