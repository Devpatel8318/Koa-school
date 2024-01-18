import db from '../../connection/db.js'

const tableName = 'allowedUsers'

export const getAllAllowedUsers = async (
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
export const getAllowedUsersName = async () => {
    return await db
        .collection(tableName)
        .find({}, { projection: { _id: 0, name: 1 } })
        .toArray()
}

export const addOneUser = async (name) => {
    return await db.collection(tableName).insertOne({ name })
}
export const deleteUser = async (name) => {
    return await db.collection(tableName).deleteOne({ name })
}
