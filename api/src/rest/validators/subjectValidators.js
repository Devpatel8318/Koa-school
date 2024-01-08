import { findSubjectById } from '../queries/subjectQueries.js'

export const doesSubjectExistById = async (ctx, next) => {
    try {
        const subjectDoc = await findSubjectById(ctx.params.id)

        if (!subjectDoc) {
            throw new Error('Subject not found')
        } else {
            ctx.state.subject = subjectDoc
            await next()
        }
    } catch (err) {
        const response = {}
        response.success = false
        response.reason = 'unauthorized'
        response.message = 'Something went wrong'
        ctx.body = response
    }
}
