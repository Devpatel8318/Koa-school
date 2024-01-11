import { successObject } from '../../utils/responseObject.js'

import * as subjectQueries from '../queries/subjectQueries.js'

export const getAllSubjects = async (ctx) => {
    const { sortBy, sortOrder, page, perPage } = ctx.query
    let sortOptions = {}
    if (sortBy && sortOrder) {
        sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1
    }

    const subjects = await subjectQueries.getAllSubjects(
        parseInt(page),
        parseInt(perPage),
        sortOptions
    )

    ctx.body = successObject(subjects)
}

export const getSingleSubject = async (ctx) => {
    const { subject } = ctx.state
    ctx.body = successObject(subject)
}

export const createSubject = async (ctx) => {
    const { body } = ctx.request

    await subjectQueries.createOneSubject(body)

    ctx.body = successObject('Subject Created.')
}

export const updateSubject = async (ctx) => {
    const updates = ctx.request.body
    const subjectId = ctx.params.id

    await subjectQueries.updateOneSubject(subjectId, updates)

    ctx.body = successObject('Subject updated successfully.')
}

export const deleteSubject = async (ctx) => {
    const subjectId = ctx.params.id

    await subjectQueries.deleteOneSubject(subjectId)

    ctx.body = successObject('Subject Deleted successfully.')
}
