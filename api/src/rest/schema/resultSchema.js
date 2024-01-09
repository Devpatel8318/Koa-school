const resultSchema = {
    bsonType: 'object',
    required: ['Signed_By', 'Student', 'Marks'],
    properties: {
        _id: {
            bsonType: 'objectId',
        },
        resultID: {
            bsonType: 'string',
        },
        Signed_By: {
            bsonType: 'string',
        },
        Student: {
            bsonType: 'string',
        },
        Marks: {
            bsonType: 'array',
            items: {
                bsonType: 'object',
                required: ['subCode', 'marks'],
                properties: {
                    sub_code: {
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
