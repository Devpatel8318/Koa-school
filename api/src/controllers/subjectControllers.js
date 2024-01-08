import {
    createOneSubject,
    deleteOneSubject,
    findAllSubjects,
    updateOneSubject,
} from '../queries/subjectQueries.js'

export const getAllSubjects = async (ctx) => {
    try {
        const page = parseInt(ctx.query.page)
        const perPage = parseInt(ctx.query.perPage)
        let sortOptions = {}

        if (ctx.query.sortBy && ctx.query.sortOrder) {
            const sortOrder =
                ctx.query.sortOrder.toLowerCase() === 'desc' ? -1 : 1
            sortOptions[ctx.query.sortBy] = sortOrder
        }

        const subjects = await findAllSubjects(page, perPage, sortOptions)
        ctx.status = 200
        ctx.body = subjects
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err }
    }
}

export const getSingleSubject = async (ctx) => {
    ctx.status = 200
    ctx.body = ctx.state.subject
}

export const createSubject = async (ctx) => {
    try {
        const subjectDoc = await createOneSubject(ctx.request.body)
        if (!subjectDoc) ctx.throw(500, 'Failed to create Subject')

        ctx.status = 201
        ctx.body = subjectDoc.insertedId
    } catch (err) {
        if (err.code === 11000) {
            ctx.throw(409, 'Subject Code Already Exists')
        } else {
            ctx.status = err.status || 500
            ctx.body = { error: err.message || err }
        }
    }
}

export const updateSubject = async (ctx) => {
    const subjectId = ctx.params.id
    const updates = ctx.request.body
    try {
        await updateOneSubject(subjectId, updates)
        ctx.status = 200
        ctx.body = { message: 'Subject updated successfully' }
    } catch (err) {
        ctx.status = err.status || 400
        ctx.body = { error: err.message || err }
    }
}

export const deleteSubject = async (ctx) => {
    const subjectId = ctx.params.id
    try {
        await deleteOneSubject(subjectId)
        ctx.status = 200
        ctx.body = { message: 'Subject deleted successfully' }
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: 'Internal server error' }
    }
}
