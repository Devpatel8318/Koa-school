import { v4 as uuidv4 } from 'uuid'

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
    const { Signed_By, studentId, Marks } = ctx.request.body
    const resultId = uuidv4()

    const newResultData = {
        resultId,
        Signed_By,
        studentId,
        Marks,
    }

    await resultQueries.createOneResult(newResultData)

    await studentQueries.updateOneStudent(studentId, {
        $set: { result: resultId },
    })

    ctx.body = successObject(resultId, 'result Added.')
}

export const updateResult = async (ctx) => {
    const { Signed_By, studentId, Marks } = ctx.request.body
    const { resultId } = ctx.params

    const changedResultData = {
        resultId,
        Signed_By,
        studentId,
        Marks,
    }

    await resultQueries.updateOneResult(resultId, changedResultData)

    ctx.body = successObject(resultId, 'Result updated successfully.')
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
