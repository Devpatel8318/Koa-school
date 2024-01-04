import db from '../connection/db.js'

export const findAllowedUsers = async () => {
    return await db.collection('allowedUsers').find().toArray()
}

export const findUserByName = async (name) => {
    return await db.collection('allowedUsers').findOne({ name })
}

export const addOneUser = async (body) => {
    try {
        return await db.collection('allowedUsers').insertOne({ name: body })
    } catch (err) {
        if (err.code === 11000) {
            throw new Error('User already exists')
        } else {
            throw err
        }
    }
}
export const deleteUser = async (name) => {
    return await db.collection('allowedUsers').deleteOne({ name })
}
