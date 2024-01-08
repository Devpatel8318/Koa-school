import { ObjectId } from 'mongodb'

const validId = async (ctx, next) => {
    const { id } = ctx.params

    if (!ObjectId.isValid(id)) {
        const response = {}
        response.success = false
        response.reason = 'Invalid ID'
        response.message = 'Something went wrong'
        ctx.body = response
    } else {
        ctx.params.id = new ObjectId(id)
        await next()
    }
}

export default validId
