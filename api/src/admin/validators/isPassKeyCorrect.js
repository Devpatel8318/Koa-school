import { failureObject } from '../../utils/responseObject.js'

const isPassKeyCorrect = async (ctx, next) => {
    const { passKey } = ctx.request.body

    if (passKey !== process.env.PASSKEY) {
        ctx.body = failureObject('Wrong pasword')
    } else {
        await next()
    }
}
export default isPassKeyCorrect
