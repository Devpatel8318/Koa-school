import db from '../connection/db.js'
import { ObjectId } from 'mongodb'
import {
    createOneResult,
    deleteOneResult,
    findAllResults,
    getOneFormattedResult,
    updateOneResult,
} from '../queries/resultQueries.js'
import { updateOneStudent } from '../queries/studentQueries.js'

const transformDoc = (resultDoc) => {
    return {
        _id: resultDoc[0]._id,
        Signed_By: resultDoc[0].Signed_By,
        studentInfo: resultDoc[0].studentInfo,
        Marks: resultDoc[0].Marks.map((mark) => {
            const correspondingSubject = resultDoc[0].subjectInfo.find(
                (subject) => subject._id === mark.sub_code
            )
            return {
                sub_code: mark.sub_code,
                marks: mark.marks,
                name: correspondingSubject.name,
                credit: correspondingSubject.credit,
                maximumMarks: correspondingSubject.maximumMarks,
                description: correspondingSubject.description,
            }
        }),
    }
}

export const getResults = async (ctx) => {
    try {
        const results = await findAllResults()
        ctx.status = 200
        ctx.body = results
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err }
    }
}

export const getSingleResult = async (ctx) => {
    ctx.status = 200
    ctx.body = ctx.state.result
}

export const getSingleFormattedResult = async (ctx) => {
    try {
        const resultDoc = await getOneFormattedResult({ _id: ctx.params.id })

        ctx.status = 200
        ctx.body = transformDoc(resultDoc)
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const getFormattedResultByStudent = async (ctx) => {
    try {
        const resultDoc = await getOneFormattedResult({
            Student: ctx.state.student._id,
        })

        if (!resultDoc || resultDoc?.length === 0)
            ctx.throw(404, 'Result not found')

        ctx.status = 200
        ctx.body = transformDoc(resultDoc)
    } catch (err) {
        console.log(err)
        ctx.status = 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const createResult = async (ctx) => {
    try {
        const resultDoc = await createOneResult(ctx.request.body)

        if (!resultDoc) {
            ctx.status = 500
            ctx.body = { error: 'Failed to create Result' }
            return
        }
        const updatedStudent = await updateOneStudent(
            new ObjectId(ctx.request.body.Student),
            { $set: { result: resultDoc.insertedId } }
        )

        if (!updatedStudent) {
            await deleteOneResult(ctx.request.body)
            ctx.status = 500
            ctx.body = { error: 'Failed to update Student' }
            return
        }

        ctx.status = 201
        ctx.body = resultDoc.insertedId
    } catch (err) {
        console.log(err)
        if (err.code === 11000) {
            ctx.status = 409
            ctx.body = { error: 'Result Already Exists' }
            return
        }
        ctx.status = 500
        ctx.body = { error: err.errInfo }
    }
}

export const updateResult = async (ctx) => {
    const updates = ctx.request.body

    try {
        await updateOneResult(ctx.params.id, updates)
        ctx.status = 200
        ctx.body = { message: 'Result updated successfully' }
    } catch (err) {
        ctx.status = 400
        ctx.body = err.errInfo || err
    }
}

export const deleteResult = async (ctx) => {
    try {
        const foundDoc = ctx.state.result

        await deleteOneResult({ _id: ctx.params.id })

        const updatedStudent = updateOneStudent(
            new ObjectId(foundDoc.Student),
            { $unset: { result: '' } }
        )

        if (updatedStudent.modifiedCount === 0) {
            ctx.status = 500
            ctx.body = { error: 'Failed to update Student' }
            return
        }

        ctx.status = 200
        ctx.body = { message: 'Result deleted successfully' }
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: 'Internal server error' }
    }
}
