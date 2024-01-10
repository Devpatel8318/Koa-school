import * as resultQueries from '../queries/resultQueries.js'

import * as studentQueries from '../queries/studentQueries.js'

import { transformDoc } from '../helpers/transformDoc.js'
import { failureObject, successObject } from '../../utils/responseObject.js'

export const getAllResults = async (ctx) => {
    let response = {}
    try {
        const { sortBy, sortOrder, page, perPage } = ctx.query
        let sortOptions = {}

        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1
        }

        const results = await resultQueries.getAllResults(
            parseInt(page),
            parseInt(perPage),
            sortOptions
        )

        response = successObject(results)
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}

export const getSingleResult = async (ctx) => {
    const { result } = ctx.state
    ctx.body = successObject(result)
}

export const getSingleFormattedResult = async (ctx) => {
    let response = {}
    const { id } = ctx.params
    try {
        const resultDoc = await resultQueries.getOneFormattedResult({
            resultId: id,
        })

        response = successObject(transformDoc(resultDoc))
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}

export const getFormattedResultByStudent = async (ctx) => {
    let response = {}
    const { studentId } = ctx.state.student
    try {
        const resultDoc = await resultQueries.getOneFormattedResult({
            studentId,
        })

        if (!resultDoc) {
            throw new Error('Failed to get Result')
        }
        response = successObject(transformDoc(resultDoc))
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}

export const createResult = async (ctx) => {
    const { body } = ctx.request
    const { studentId } = body

    let response = {}
    try {
        const resultDoc = await resultQueries.createOneResult(body)

        if (!resultDoc) {
            throw new Error('Failed to create Result')
        }

        const { resultId } = await resultQueries.getOneResult({ studentId })

        await studentQueries.updateOneStudent(studentId, {
            $set: { result: resultId },
        })

        response = successObject('result Added')
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}

export const updateResult = async (ctx) => {
    let response = {}
    const updates = ctx.request.body
    const { id } = ctx.params

    try {
        await resultQueries.updateOneResult(id, updates)

        response = successObject('Result updated successfully.')
    } catch (err) {
        response = failureObject(err.errInfo || err)
    }
    ctx.body = response
}

export const deleteResult = async (ctx) => {
    let response = {}
    const { id } = ctx.params.id
    const { studentId } = ctx.state.result
    try {
        await resultQueries.deleteOneResult({ resultId: id })

        await studentQueries.updateOneStudent(studentId, {
            $unset: { result: '' },
        })

        response = successObject('Result deleted successfully')
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}
