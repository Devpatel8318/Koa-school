import { validate as isValidUuid } from 'uuid'
import * as resultQueries from '../queries/resultQueries.js'
import { failureObject } from '../../utils/responseObject.js'

export const doesResultExistById = async (ctx, next) => {
    try {
        const { id } = ctx.params
        const resultDoc = await resultQueries.getOneResult({
            resultId: id,
        })
        if (!resultDoc) {
            throw new Error('Result not found')
        } else {
            ctx.state.result = resultDoc
            await next()
        }
    } catch (err) {
        ctx.body = failureObject(err.message)
    }
}

export const isstudentIdValid = async (ctx, next) => {
    const { id } = ctx.params
    if (!isValidUuid(id)) {
        ctx.body = failureObject('Invalid UUID')
    } else {
        await next()
    }
}

export const isStudentvalid = async (ctx, next) => {
    const { result } = ctx.state.student
    if (!result) {
        ctx.body = failureObject('Invalid Student')
    } else {
        await next()
    }
}
