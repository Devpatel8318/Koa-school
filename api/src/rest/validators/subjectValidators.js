import { failureObject } from '../../utils/responseObject.js'
import * as subjectQueries from '../queries/subjectQueries.js'

export const doesSubjectExistByCode = async (ctx, next) => {
    try {
        const { id } = ctx.params
        const subjectDoc = await subjectQueries.getSubjectByCode(id)

        if (!subjectDoc) {
            throw new Error('Subject not found')
        } else {
            ctx.state.subject = subjectDoc
            await next()
        }
    } catch (err) {
        ctx.body = failureObject(err.message)
    }
}
