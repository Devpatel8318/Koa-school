const resultSchema = {
    bsonType: 'object',
    required: ['Signed_By', 'studentId', 'Marks'],
    properties: {
        _id: {
            bsonType: 'objectId',
        },
        resultId: {
            bsonType: 'string',
        },
        Signed_By: {
            bsonType: 'string',
        },
        studentId: {
            bsonType: 'string',
        },
        Marks: {
            bsonType: 'array',
            items: {
                bsonType: 'object',
                required: ['subjectCode', 'marks'],
                properties: {
                    subjectCode: {
                        bsonType: 'string',
                    },
                    marks: {
                        bsonType: 'int',
                    },
                },
            },
        },
    },
    additionalProperties: false,
}

export default resultSchema
