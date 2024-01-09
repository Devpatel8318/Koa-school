const subjectSchema = {
    bsonType: 'object',
    required: ['name', 'credit', 'maximumMarks', '_id'],
    properties: {
        _id: {
            bsonType: 'objectId',
        },
        subjectCode: {
            bsonType: 'string',
        },
        name: {
            bsonType: 'string',
            minLength: 5,
        },
        credit: {
            bsonType: 'number',
        },
        maximumMarks: {
            bsonType: 'number',
        },
        description: {
            bsonType: 'string',
            maxLength: 100,
        },
    },
    additionalProperties: false,
}
export default subjectSchema
