import { v4 as uuidv4 } from 'uuid'
import db from '../../connection/db.js'

const tableName = 'allowedUsers'

export const getAllAllowedUsers = async (page, perPage, sortOptions = {}) => {
    const skip = (page - 1) * perPage
    return await db
        .collection(tableName)
        .find({}, { projection: { _id: 0 } })
        .sort(sortOptions)
        .skip(skip)
        .limit(perPage)
        .toArray()
}
export const getAllowedUsersName = async () => {
    return await db
        .collection(tableName)
        .find({}, { projection: { _id: 0, allowedUserID: 0, name: 1 } })
        .toArray()
}

export const getUserByName = async (name) => {
    return await db
        .collection(tableName)
        .findOne({ name }, { projection: { _id: 0 } })
}

export const addOneUser = async (body) => {
    try {
        return await db
            .collection(tableName)
            .insertOne({ name: body, allowedUserID: uuidv4() })
    } catch (err) {
        if (err.code === 11000) {
            throw new Error('User already exists')
        } else {
            throw err
        }
    }
}
export const deleteUser = async (name) => {
    return await db.collection(tableName).deleteOne({ name })
}
