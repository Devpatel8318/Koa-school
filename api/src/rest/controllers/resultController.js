import { ObjectId } from 'mongodb'
import {
    createOneResult,
    deleteOneResult,
    findAllResults,
    getOneFormattedResult,
    updateOneResult,
} from '../queries/resultQueries.js'
import { updateOneStudent } from '../queries/studentQueries.js'
import { transformDoc } from '../helpers/transformDoc.js'

export const getResults = async (ctx) => {
    const response = {}
    try {
        const { sortBy, sortOrder, page, perPage } = ctx.query
        let sortOptions = {}

        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1
        }

        const results = await findAllResults(
            parseInt(page),
            parseInt(perPage),
            sortOptions
        )

        response.success = true
        response.data = results
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const getSingleResult = async (ctx) => {
    const response = {}
    response.success = true
    response.data = ctx.state.result
    response.message = 'data displayed successfully.'
    ctx.body = response
}

export const getSingleFormattedResult = async (ctx) => {
    const response = {}
    try {
        const resultDoc = await getOneFormattedResult({ _id: ctx.params.id })

        response.success = true
        response.data = transformDoc(resultDoc)
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const getFormattedResultByStudent = async (ctx) => {
    const response = {}
    try {
        const resultDoc = await getOneFormattedResult({
            Student: ctx.state.student._id,
        })

        response.success = true
        response.data = transformDoc(resultDoc)
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const createResult = async (ctx) => {
    const response = {}
    try {
        const resultDoc = await createOneResult(ctx.request.body)

        if (!resultDoc) {
            ctx.status = 500
            ctx.body = { error: 'Failed to create Result' }
            return
        }
        await updateOneStudent(new ObjectId(ctx.request.body.Student), {
            $set: { result: resultDoc.insertedId },
        })

        response.success = true
        response.data = resultDoc.insertedId
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason =
            err.code === 11000 ? 'Result Already Exists' : err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const updateResult = async (ctx) => {
    const response = {}
    const updates = ctx.request.body
    try {
        await updateOneResult(ctx.params.id, updates)
        response.success = true
        response.data = 'Result updated successfully'
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.errInfo || err
        response.message = 'Something went wrong'
        ctx.status = 400
        ctx.body = err.errInfo || err
    }
    ctx.body = response
}

export const deleteResult = async (ctx) => {
    const response = {}
    try {
        await deleteOneResult({ _id: ctx.params.id })

        await updateOneStudent(new ObjectId(ctx.state.result.Student), {
            $unset: { result: '' },
        })

        response.success = true
        response.data = 'Result deleted successfully'
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}
