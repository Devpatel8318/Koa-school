import { v4 as uuidv4 } from 'uuid'

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
    return db.collection(tableName).insertOne({ ...body, studentID: uuidv4() })
}

export const updateOneStudent = async (studentID, updates) => {
    return await db.collection(tableName).updateOne({ studentID }, updates)
}
1
export const deleteOneStudent = async (studentID) => {
    await db.collection(tableName).deleteOne({ studentID })
}
