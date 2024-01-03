import db from '../connection/db.js'
import { ObjectId } from 'mongodb'

const pipeline = (argument) => [
    {
        $match: argument,
    },
    {
        $addFields: {
            convertedStudentId: { $toObjectId: '$Student' },
        },
    },
    {
        $lookup: {
            from: 'students',
            localField: 'convertedStudentId',
            foreignField: '_id',
            as: 'studentInfo',
        },
    },
    {
        $unwind: '$studentInfo',
    },
    {
        $lookup: {
            from: 'subjects',
            localField: 'Marks.sub_code',
            foreignField: '_id',
            as: 'subjectInfo',
        },
    },
    {
        $project: {
            _id: 1,
            Signed_By: 1,
            Marks: 1,
            'studentInfo._id': 1,
            'studentInfo.firstName': 1,
            'studentInfo.lastName': 1,
            'studentInfo.email': 1,
            subjectInfo: 1,
        },
    },
]
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
        const results = await db.collection('results').find().toArray()
        ctx.status = 200
        ctx.body = results
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err }
    }
}

export const getSingleResult = async (ctx) => {
    try {
        const resultDoc = await db
            .collection('results')
            .findOne({ _id: ctx.params.id })

        if (!resultDoc) ctx.throw(404, 'Result not found')

        ctx.status = 200
        ctx.body = resultDoc
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: 'Internal server error' }
    }
}

export const getSingleFormattedResult = async (ctx) => {
    try {
        const resultDoc = await db
            .collection('results')
            .aggregate(pipeline({ _id: ctx.params.id }))
            .toArray()

        if (!resultDoc || resultDoc?.length === 0)
            ctx.throw(404, 'Result not found')

        ctx.status = 200
        ctx.body = transformDoc(resultDoc)
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: 'Internal server error' }
    }
}

export const getFormattedResultByStudent = async (ctx) => {
    try {
        const resultDoc = await db
            .collection('results')
            .aggregate(pipeline({ Student: ctx.params.id }))
            .toArray()

        if (!resultDoc || resultDoc?.length === 0)
            ctx.throw(404, 'Result not found')

        ctx.status = 200
        ctx.body = transformDoc(resultDoc)
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: 'Internal server error' }
    }
}

export const createResult = async (ctx) => {
    try {
        const resultDoc = await db
            .collection('results')
            .insertOne(ctx.request.body)

        if (!resultDoc) {
            ctx.status = 500
            ctx.body = { error: 'Failed to create Result' }
            return
        }

        const updatedStudent = await db
            .collection('students')
            .updateOne(
                { _id: new ObjectId(ctx.request.body.Student) },
                { $set: { result: resultDoc.insertedId } }
            )

        if (!updatedStudent) {
            await db.collection('result').deleteOne(ctx.request.body)
            ctx.status = 500
            ctx.body = { error: 'Failed to update Student' }
            return
        }

        ctx.status = 201
        ctx.body = resultDoc.insertedId
    } catch (err) {
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
        const updatedResult = await db
            .collection('results')
            .updateOne({ _id: ctx.params.id }, { $set: updates })

        if (updatedResult.matchedCount === 0) {
            ctx.status = 404
            ctx.body = { error: 'Result not found' }
            return
        }

        ctx.status = 200
        ctx.body = { message: 'Result updated successfully' }
    } catch (err) {
        ctx.status = 400
        ctx.body = err.errInfo || err
    }
}

export const deleteResult = async (ctx) => {
    try {
        const foundDoc = await db
            .collection('results')
            .findOne({ _id: ctx.params.id })

        if (!foundDoc) {
            ctx.status = 404
            ctx.body = { error: 'Result not found' }
            return
        }

        const deleteResult = await db
            .collection('results')
            .deleteOne({ _id: ctx.params.id })

        if (deleteResult.deletedCount === 0) {
            ctx.status = 404
            ctx.body = { error: 'Result not Deleted' }
            return
        }

        const updatedStudent = await db
            .collection('students')
            .updateOne(
                { _id: new ObjectId(foundDoc.Student) },
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
