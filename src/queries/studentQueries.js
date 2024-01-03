import db from '../connection/db.js'

export const findAllStudents = async (filter) => {
    return await db
        .collection('students')
        .find(filter)
        .project({ password: 0 })
        .toArray()
}

export const findOneStudent = async (filter, projection = {}) => {
    return await db.collection('students').findOne(filter, projection)
}

export const createOneStudent = async (body) => {
    return db.collection('students').insertOne(body)
}

export const updateOneStudent = async (id, query) => {
    return await db.collection('students').updateOne({ _id: id }, query)
}

export const deleteOneStudent = async (id) => {
    await db.collection('students').deleteOne({ _id: id })
}
