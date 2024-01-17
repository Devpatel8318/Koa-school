import db from '../../connection/db.js'

const tableName = 'subjects'

export const getAllSubjects = async (
    page = null,
    perPage = null,
    sortOptions = {}
) => {
    if (page === null && perPage === null) {
        return await db
            .collection(tableName)
            .find({}, { projection: { _id: 0 } })
            .sort(sortOptions)
            .toArray()
    }
    const skip = (page - 1) * perPage

    return await db
        .collection(tableName)
        .find({}, { projection: { _id: 0 } })
        .sort(sortOptions)
        .skip(skip)
        .limit(perPage)
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
