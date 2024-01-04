const allowedUsersSchema = {
    bsonType: 'object',
    required: ['name'],
    properties: {
        name: {
            bsonType: 'string',
        },
        _id: {
            bsonType: 'objectId',
        },
    },
    additionalProperties: false,
}

export default allowedUsersSchema
