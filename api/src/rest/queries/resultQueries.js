import { v4 as uuidv4 } from 'uuid'

import db from '../../connection/db.js'

const pipeline = (argument) => [
    {
        $match: argument,
    },
    {
        $lookup: {
            from: 'students',
            localField: 'Student',
            foreignField: 'studentID',
            as: 'studentInfo',
        },
    },
    {
        $unwind: '$studentInfo',
    },
    {
        $lookup: {
            from: 'subjects',
            localField: 'Marks.subCode',
            foreignField: 'subjectCode',
            as: 'subjectInfo',
        },
    },
    {
        $project: {
            _id: 0,
            resultID: 1,
            Signed_By: 1,
            Marks: 1,
            'studentInfo.studentID': 1,
            'studentInfo.firstName': 1,
            'studentInfo.lastName': 1,
            'studentInfo.email': 1,
            subjectInfo: 1,
        },
    },
]

const tableName = 'results'

export const findAllResults = async (page, perPage, sortOptions = {}) => {
    const skip = (page - 1) * perPage
    return await db
        .collection(tableName)
        .find({}, { projection: { _id: 0 } })
        .sort(sortOptions)
        .skip(skip)
        .limit(perPage)
        .toArray()
}

export const findOneResult = async (filter) => {
    return await db
        .collection(tableName)
        .findOne(filter, { projection: { _id: 0 } })
}

export const getOneFormattedResult = async (filter) => {
    console.log(filter);
    return await db.collection(tableName).aggregate(pipeline(filter)).toArray()
}

export const createOneResult = async (body) => {
    return await db
        .collection(tableName)
        .insertOne({ ...body, resultID: uuidv4() })
}

export const updateOneResult = async (resId, body) => {
    return await db
        .collection(tableName)
        .updateOne({ resultID: resId }, { $set: body })
}

export const deleteOneResult = async (filter) => {
    return await db.collection(tableName).deleteOne(filter)
}
