import { isTokenValid } from '../helpers/jwtFunctions.js'

export const auth = async (ctx) => {
    if (isTokenValid(ctx.cookies.get('myToken'))) {
        return null
    }
    return 'unauthorized'
}
