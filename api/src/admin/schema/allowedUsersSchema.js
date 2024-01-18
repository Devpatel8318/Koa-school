const allowedUsersSchema = {
    bsonType: 'object',
    required: ['name'],
    properties: {
        name: {
            bsonType: 'string',
        },
        allowedUserId: {
            bsonType: 'string',
        },
        _id: {
            bsonType: 'objectId',
        },
    },
    additionalProperties: false,
}

export default allowedUsersSchema
