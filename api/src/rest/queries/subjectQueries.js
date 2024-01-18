import db from '../../connection/db.js'

const tableName = 'subjects'

export const getAllSubjects = async (
    filter = {},
    page = null,
    perPage = null,
    sortOptions = {}
) => {
    const skip = (page - 1) * perPage
    const limit = perPage || 0

    return await db
        .collection(tableName)
        .find(filter, { projection: { _id: 0 } })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray()
}

export const getSubjectByCode = async (subjectCode) => {
    return await db
        .collection(tableName)
        .findOne({ subjectCode }, { projection: { _id: 0 } })
}

export const createOneSubject = async (body) => {
    return await db.collection(tableName).insertOne(body)
}

export const updateOneSubject = async (subjectCode, body) => {
    return await db
        .collection(tableName)
        .updateOne({ subjectCode }, { $set: body })
}

export const deleteOneSubject = async (subjectCode) => {
    await db.collection(tableName).deleteOne({ subjectCode })
}
