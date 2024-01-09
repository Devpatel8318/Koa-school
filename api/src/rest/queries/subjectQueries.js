import db from '../../connection/db.js'

const tableName = 'subjects'

export const findAllSubjects = async (page, perPage, sortOptions = {}) => {
    const skip = (page - 1) * perPage
    return await db
        .collection(tableName)
        .find({}, { projection: { _id: 0 } })
        .sort(sortOptions)
        .skip(skip)
        .limit(perPage)
        .toArray()
}

export const findSubjectByCode = async (sub_code) => {
    return await db
        .collection(tableName)
        .findOne({ subjectCode: sub_code }, { projection: { _id: 0 } })
}

export const createOneSubject = async (body) => {
    return await db.collection(tableName).insertOne(body)
}

export const updateOneSubject = async (sub_code, body) => {
    return await db
        .collection(tableName)
        .updateOne({ subjectCode: sub_code }, { $set: body })
}

export const deleteOneSubject = async (sub_code) => {
    await db.collection(tableName).deleteOne({ subjectCode: sub_code })
}
