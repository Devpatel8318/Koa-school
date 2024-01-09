const allowedUsersSchema = {
    bsonType: 'object',
    required: ['name', 'allowedUserID'],
    properties: {
        name: {
            bsonType: 'string',
        },
        allowedUserID: {
            bsonType: 'string',
        },
        _id: {
            bsonType: 'objectId',
        },
    },
    additionalProperties: false,
}

export default allowedUsersSchema
