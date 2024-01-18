import db from '../../connection/db.js'

const pipeline = (argument) => [
    {
        $match: argument,
    },
    {
        $lookup: {
            from: 'students',
            localField: 'studentId',
            foreignField: 'studentId',
            as: 'studentInfo',
        },
    },
    {
        $unwind: '$studentInfo',
    },
    {
        $lookup: {
            from: 'subjects',
            localField: 'Marks.subjectCode',
            foreignField: 'subjectCode',
            as: 'subjectInfo',
        },
    },
    {
        $project: {
            _id: 0,
            resultId: 1,
            Signed_By: 1,
            Marks: 1,
            'studentInfo.studentId': 1,
            'studentInfo.firstName': 1,
            'studentInfo.lastName': 1,
            'studentInfo.email': 1,
            subjectInfo: 1,
        },
    },
]

const tableName = 'results'

export const getAllResults = async (page, perPage, sortOptions = {}) => {
    const skip = (page - 1) * perPage
    return await db
        .collection(tableName)
        .find({}, { projection: { _id: 0 } })
        .sort(sortOptions)
        .skip(skip)
        .limit(perPage)
        .toArray()
}

export const getOneResult = async (filter) => {
    return await db
        .collection(tableName)
        .findOne(filter, { projection: { _id: 0 } })
}

export const getOneFormattedResult = async (filter) => {
    return await db.collection(tableName).aggregate(pipeline(filter)).toArray()
}

export const createOneResult = async (body) => {
    return await db.collection(tableName).insertOne(body)
}

export const updateOneResult = async (resultId, body) => {
    return await db
        .collection(tableName)
        .updateOne({ resultId }, { $set: body })
}

export const deleteOneResult = async (filter) => {
    return await db.collection(tableName).deleteOne(filter)
}
