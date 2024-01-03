import db from '../connection/db.js'

export const getAllSubjects = async (ctx) => {
    try {
        const subjects = await db.collection('subjects').find().toArray()
        ctx.status = 200
        ctx.body = subjects
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err }
    }
}

export const getSingleSubject = async (ctx) => {
    const subjectId = ctx.params.id

    try {
        const subjectDoc = await db
            .collection('subjects')
            .findOne({ _id: subjectId })

        if (!subjectDoc) ctx.throw(404, 'Subject not found')

        ctx.status = 200
        ctx.body = subjectDoc
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const createSubject = async (ctx) => {
    try {
        const subjectDoc = await db
            .collection('subjects')
            .insertOne(ctx.request.body)

        if (!subjectDoc) ctx.throw(500, 'Failed to create Subject')

        ctx.status = 201
        ctx.body = subjectDoc.insertedId
    } catch (err) {
        if (err.code === 11000) {
            ctx.throw(409, 'Subject Code Already Exists')
        } else {
            ctx.status = err.status || 500
            ctx.body = { error: err.message || err }
        }
    }
}

export const updateSubject = async (ctx) => {
    const subjectId = ctx.params.id
    const updates = ctx.request.body

    try {
        const updatedSubject = await db
            .collection('subjects')
            .updateOne({ _id: subjectId }, { $set: updates })

        if (updatedSubject.matchedCount === 0)
            ctx.throw(404, 'Subject not found')

        ctx.status = 200
        ctx.body = { message: 'Subject updated successfully' }
    } catch (err) {
        ctx.status = err.status || 400
        ctx.body = { error: err.message || err }
    }
}

export const deleteSubject = async (ctx) => {
    const subjectId = ctx.params.id

    try {
        const subjectDoc = await db
            .collection('subjects')
            .deleteOne({ _id: subjectId })

        if (subjectDoc.deletedCount === 0) ctx.throw(404, 'Subject not found')

        ctx.status = 200
        ctx.body = { message: 'Subject deleted successfully' }
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: 'Internal server error' }
    }
}
