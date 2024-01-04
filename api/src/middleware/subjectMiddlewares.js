import { findSubjectById } from '../queries/subjectQueries.js'

export const doesSubjectExistById = async (ctx, next) => {
    try {
        const subjectDoc = await findSubjectById(ctx.params.id)

        if (!subjectDoc) {
            ctx.throw(404, 'Subject not found')
        } else {
            ctx.state.subject = subjectDoc
            await next()
        }
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}
