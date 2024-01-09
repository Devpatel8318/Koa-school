import { validate as isValidUuid } from 'uuid'

const isIdValid = async (ctx, next) => {
    const { id } = ctx.params

    if (!isValidUuid(id)) {
        ctx.body = {
            success: false,
            reason: 'Invalid UUID',
            message: 'Something went wrong',
        }
    } else {
        await next()
    }
}

export default isIdValid
