import { isTokenValid } from '../helpers/jwtFunctions.js'

const auth = async (ctx) => {
    if (isTokenValid(ctx.cookies.get('myToken'))) {
        return null
    }
    return 'unauthorized'
}

export default auth
