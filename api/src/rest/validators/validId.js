import { validate as isValidUuid } from 'uuid'
import { failureObject } from '../../utils/responseObject.js'

const isIdValid = async (ctx, next) => {
    const { id } = ctx.params

    if (!isValidUuid(id)) {
        ctx.body = failureObject('Invalid UUID')
    } else {
        await next()
    }
}

export default isIdValid
