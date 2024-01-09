import * as subjectQueries from '../queries/subjectQueries.js'

import { failureObject, successObject } from '../../utils/responseObject.js'

export const getAllSubjects = async (ctx) => {
    let response = {}
    try {
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
        response = successObject(subjects)
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}

export const getSingleSubject = async (ctx) => {
    const { subject } = ctx.state
    ctx.body = successObject(subject)
}

export const createSubject = async (ctx) => {
    let response = {}
    try {
        const { body } = ctx.request
        await subjectQueries.createOneSubject(body)

        response = successObject('Subject Created')
    } catch (err) {
        response = failureObject(
            err.code === 11000 ? 'Subject already exists' : err.message
        )
    }
    ctx.body = response
}

export const updateSubject = async (ctx) => {
    let response = {}
    try {
        const updates = ctx.request.body
        const subjectId = ctx.params.id
        await subjectQueries.updateOneSubject(subjectId, updates)

        response = successObject('Subject updated successfully')
    } catch (err) {
        response = failureObject(err.errInfo || err.message)
    }
    ctx.body = response
}

export const deleteSubject = async (ctx) => {
    let response = {}
    try {
        const subjectId = ctx.params.id
        await subjectQueries.deleteOneSubject(subjectId)

        response = successObject('Subject Deleted successfully')
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}
