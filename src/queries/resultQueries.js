import db from '../connection/db.js'

const pipeline = (argument) => [
    {
        $match: argument,
    },
    {
        $addFields: {
            convertedStudentId: { $toObjectId: '$Student' },
        },
    },
    {
        $lookup: {
            from: 'students',
            localField: 'convertedStudentId',
            foreignField: '_id',
            as: 'studentInfo',
        },
    },
    {
        $unwind: '$studentInfo',
    },
    {
        $lookup: {
            from: 'subjects',
            localField: 'Marks.sub_code',
            foreignField: '_id',
            as: 'subjectInfo',
        },
    },
    {
        $project: {
            _id: 1,
            Signed_By: 1,
            Marks: 1,
            'studentInfo._id': 1,
            'studentInfo.firstName': 1,
            'studentInfo.lastName': 1,
            'studentInfo.email': 1,
            subjectInfo: 1,
        },
    },
]

export const findAllResults = async () => {
    return await db.collection('results').find().toArray()
}

export const findOneResultById = async (id) => {
    return await db.collection('results').findOne({ _id: id })
}

export const getOneFormattedResult = async (filter) => {
    return await db.collection('results').aggregate(pipeline(filter)).toArray()
}

export const createOneResult = async (body) => {
    return await db.collection('results').insertOne(body)
}

export const updateOneResult = async (id, body) => {
    return await db.collection('results').updateOne({ _id: id }, { $set: body })
}

export const deleteOneResult = async (filter) => {
    return await db.collection('results').deleteOne(filter)
}
