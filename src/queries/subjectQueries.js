import db from '../connection/db.js'

export const findAllSubjects = async () => {
    return await db.collection('subjects').find().toArray()
}

export const findSubjectById = async (id) => {
    return await db.collection('subjects').findOne({ _id: id })
}

export const createOneSubject = async (body) => {
    return await db.collection('subjects').insertOne(body)
}

export const updateOneSubject = async (id, body) => {
    return await db
        .collection('subjects')
        .updateOne({ _id: id }, { $set: body })
}

export const deleteOneSubject = async (id) => {
    await db.collection('subjects').deleteOne({ _id: id })
}
