const studentSchema = {
    bsonType: 'object',
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
        _id: {
            bsonType: 'objectId',
        },
        studentID: {
            bsonType: 'string',
        },
        firstName: {
            bsonType: 'string',
            minLength: 6,
            maxLength: 25,
        },
        lastName: {
            bsonType: 'string',
            minLength: 6,
            maxLength: 25,
        },
        email: {
            bsonType: 'string',
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
        password: {
            bsonType: 'string',
            minLength: 6,
        },
        result: {
            bsonType: 'string',
        },
    },
    additionalProperties: false,
}

export default studentSchema
