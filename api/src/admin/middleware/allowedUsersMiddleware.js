import { isTokenValid } from '../helpers/jwtFunctions.js'

export const auth = async (ctx) => {
    if (isTokenValid(ctx.cookies.get('myToken'))) {
        return null
    } else {
        return 'unauthorized'
    }
}
