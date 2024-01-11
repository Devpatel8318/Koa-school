import { failureObject, successObject } from '../../utils/responseObject.js'

import * as resultQueries from '../queries/resultQueries.js'
import * as studentQueries from '../queries/studentQueries.js'

import { transformDoc } from '../helpers/transformDoc.js'

export const getAllResults = async (ctx) => {
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

    ctx.body = successObject(results)
}

export const getSingleResult = async (ctx) => {
    const { result } = ctx.state
    ctx.body = successObject(result)
}

export const getSingleFormattedResult = async (ctx) => {
    let response = {}
    try {
        const { resultId } = ctx.params

        const resultData = await resultQueries.getOneFormattedResult({
            resultId,
        })

        if (resultData && !resultData.length) {
            const err = new Error('Internal Server Error')
            err.status = 500
            throw err
        }

        response = successObject(transformDoc(resultData[0]))
    } catch (err) {
        response = failureObject(err.message)
        if (err.status) {
            ctx.status = err.status
        }
    }
    ctx.body = response
}

export const getFormattedResultByStudent = async (ctx) => {
    let response = {}
    try {
        const { studentId } = ctx.state.student

        const resultData = await resultQueries.getOneFormattedResult({
            studentId,
        })

        if (resultData && !resultData.length) {
            const err = new Error('Internal Server Error')
            err.status = 500
            throw err
        }

        response = successObject(transformDoc(resultData[0]))
    } catch (err) {
        response = failureObject(err.message)
        if (err.status) {
            ctx.status = err.status
        }
    }
    ctx.body = response
}

export const createResult = async (ctx) => {
    let response = {}
    try {
        const { body } = ctx.request
        const { studentId } = body

        const resultData = await resultQueries.createOneResult(body)

        if (!resultData) {
            throw new Error('Failed to create Result.')
        }

        const { resultId } = await resultQueries.getOneResult({ studentId })

        await studentQueries.updateOneStudent(studentId, {
            $set: { result: resultId },
        })

        response = successObject('result Added.')
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}

export const updateResult = async (ctx) => {
    const updates = ctx.request.body
    const { resultId } = ctx.params

    await resultQueries.updateOneResult(resultId, updates)

    ctx.body = successObject('Result updated successfully.')
}

export const deleteResult = async (ctx) => {
    const { resultId } = ctx.params
    const { studentId } = ctx.state.result

    await resultQueries.deleteOneResult({ resultId })

    await studentQueries.updateOneStudent(studentId, {
        $unset: { result: '' },
    })

    ctx.body = successObject('Result deleted successfully.')
}
