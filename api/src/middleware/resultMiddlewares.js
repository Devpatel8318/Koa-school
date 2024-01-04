import { ObjectId } from 'mongodb'
import { findOneResultById } from '../queries/resultQueries.js'

export const doesResultExistById = async (ctx, next) => {
    try {
        const resultDoc = await findOneResultById(ctx.params.id)
        if (!resultDoc) {
            ctx.throw(404, 'Result not found')
        } else {
            ctx.state.result = resultDoc
            await next()
        }
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const validStudentId = async (ctx, next) => {
    if (!ObjectId.isValid(ctx.params.id)) {
        ctx.throw(400, 'Invalid ID')
    } else {
        await next()
    }
}

export const validStudent = async (ctx, next) => {
    if (!ctx.state.student.result) {
        ctx.throw(400, 'Invalid Studentt')
    } else {
        ctx.state.student._id = ctx.state.student._id.toString()
        await next()
    }
}
