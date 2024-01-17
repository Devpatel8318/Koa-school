import { successObject } from '../../utils/responseObject.js'

import * as subjectQueries from '../queries/subjectQueries.js'

export const getAllSubjects = async (ctx) => {
    const { sortBy, sortOrder, page, perPage } = ctx.query
    let sortOptions = {}

    if (sortBy && sortOrder) {
        sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1
    }

    const subjects = await subjectQueries.getAllSubjects(
        {},
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
    const { subjectCode, name, credit, maximumMarks } = ctx.request.body

    const newSubjectData = {
        subjectCode,
        name,
        credit,
        maximumMarks,
    }

    await subjectQueries.createOneSubject(newSubjectData)

    ctx.body = successObject(subjectCode, 'Subject Created.')
}

export const updateSubject = async (ctx) => {
    const { subjectCode, name, credit, maximumMarks } = ctx.request.body

    const changedSubjectData = {
        subjectCode,
        name,
        credit,
        maximumMarks,
    }

    await subjectQueries.updateOneSubject(subjectCode, changedSubjectData)

    ctx.body = successObject(subjectCode, 'Subject updated successfully.')
}

export const deleteSubject = async (ctx) => {
    const { subjectCode } = ctx.params

    await subjectQueries.deleteOneSubject(subjectCode)

    ctx.body = successObject('Subject Deleted successfully.')
}
