import {
    createOneSubject,
    deleteOneSubject,
    findAllSubjects,
    updateOneSubject,
} from '../queries/subjectQueries.js'

export const getAllSubjects = async (ctx) => {
    const response = {}
    try {
        let sortOptions = {}
        const { sortBy, sortOrder, page, perPage } = ctx.query

        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1
        }

        const subjects = await findAllSubjects(
            parseInt(page),
            parseInt(perPage),
            sortOptions
        )

        response.success = true
        response.data = subjects
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const getSingleSubject = async (ctx) => {
    const response = {}
    response.success = true
    response.data = ctx.state.subject
    response.message = 'data displayed successfully.'
    ctx.body = response
}

export const createSubject = async (ctx) => {
    const response = {}
    try {
        const subjectDoc = await createOneSubject(ctx.request.body)
        if (!subjectDoc) throw new Error('Failed to create Subject')

        response.success = true
        response.data = subjectDoc.insertedId
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason =
            err.code === 11000 ? 'Subject code already exists' : err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const updateSubject = async (ctx) => {
    const subjectId = ctx.params.id
    const updates = ctx.request.body
    const response = {}
    try {
        await updateOneSubject(subjectId, updates)
        response.success = true
        response.data = 'Subject updated successfully'
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.errInfo || err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const deleteSubject = async (ctx) => {
    const subjectId = ctx.params.id
    const response = {}
    try {
        await deleteOneSubject(subjectId)

        response.success = true
        response.data = 'Subject deleted successfully'
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}
