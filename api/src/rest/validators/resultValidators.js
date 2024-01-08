import { ObjectId } from 'mongodb'
import { findOneResultById } from '../queries/resultQueries.js'

export const doesResultExistById = async (ctx, next) => {
    try {
        const resultDoc = await findOneResultById(ctx.params.id)
        if (!resultDoc) {
            throw new Error('Result not found')
        } else {
            ctx.state.result = resultDoc
            await next()
        }
    } catch (err) {
        const response = {}
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
        ctx.body = response
    }
}

export const validStudentId = async (ctx, next) => {
    if (!ObjectId.isValid(ctx.params.id)) {
        const response = {}
        response.success = false
        response.reason = 'Invalid ID'
        response.message = 'Something went wrong'
        ctx.body = response
    } else {
        await next()
    }
}

export const validStudent = async (ctx, next) => {
    if (!ctx.state.student.result) {
        const response = {}
        response.success = false
        response.reason = 'Invalid Student'
        response.message = 'Something went wrong'
        ctx.body = response
    } else {
        ctx.state.student._id = ctx.state.student._id.toString()
        await next()
    }
}
