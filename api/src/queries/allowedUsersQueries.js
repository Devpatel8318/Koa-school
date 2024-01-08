import db from '../connection/db.js'

export const findAllowedUsers = async (page, perPage, sortOptions = {}) => {
    const skip = (page - 1) * perPage
    return await db
        .collection('allowedUsers')
        .find()
        .sort(sortOptions)
        .skip(skip)
        .limit(perPage)
        .toArray()
}
export const findAllowedUsersName = async () => {
    return await db
        .collection('allowedUsers')
        .find({}, { projection: { _id: 0, name: 1 } })
        .toArray()
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
