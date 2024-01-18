import db from '../../connection/db.js'

const tableName = 'students'

export const getAllStudents = async (
    filter,
    page,
    perPage,
    sortOptions = {}
) => {
    const skip = (page - 1) * perPage
    const students = await db
        .collection(tableName)
        .find(filter, { projection: { _id: 0, password: 0 } })
        .sort(sortOptions)
        .skip(skip)
        .limit(perPage)
        .toArray()
    return students
}

export const getOneStudent = async (filter, projection = {}) => {
    return await db.collection(tableName).findOne(filter, projection)
}

export const createOneStudent = async (body) => {
    return db.collection(tableName).insertOne(body)
}

export const updateOneStudent = async (studentId, updates) => {
    return await db.collection(tableName).updateOne({ studentId }, updates)
}
1
export const deleteOneStudent = async (studentId) => {
    await db.collection(tableName).deleteOne({ studentId })
}
