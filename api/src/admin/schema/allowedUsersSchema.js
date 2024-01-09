const allowedUsersSchema = {
    bsonType: 'object',
    required: ['name', 'allowedUserId'],
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
