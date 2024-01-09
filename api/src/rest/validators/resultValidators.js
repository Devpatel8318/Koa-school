import { validate as isValidUuid } from 'uuid'
import * as resultQueries from '../queries/resultQueries.js'

export const doesResultExistById = async (ctx, next) => {
    try {
        const { id } = ctx.params
        const resultDoc = await resultQueries.findOneResult({
            resultID: id,
        })
        if (!resultDoc) {
            throw new Error('Result not found')
        } else {
            ctx.state.result = resultDoc
            await next()
        }
    } catch (err) {
        ctx.body = {
            success: false,
            reason: err.message,
            message: 'Something went wrong',
        }
    }
}

export const isStudentIdValid = async (ctx, next) => {
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

export const isStudentvalid = async (ctx, next) => {
    const { result } = ctx.state.student
    if (!result) {
        ctx.body = {
            success: false,
            reason: 'Invalid Student',
            message: 'Something went wrong',
        }
    } else {
        await next()
    }
}
