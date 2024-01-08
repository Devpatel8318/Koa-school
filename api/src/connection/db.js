import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
config()

import studentSchema from '../rest/schema/studentSchema.js'
import subjectSchema from '../rest/schema/subjectSchema.js'
import resultSchema from '../rest/schema/resultSchema.js'
import allowedUsersSchema from '../admin/schema/allowedUsersSchema.js'

const mongodbConnection = async () => {
    try {
        const client = new MongoClient(process.env.URL)
        await client.connect()
        console.log(`mongoDB Connected Successfully`)

        const db = client.db()

        await db.createCollection('students', {
            validator: { $jsonSchema: studentSchema },
        })
        await db.createCollection('subjects', {
            validator: { $jsonSchema: subjectSchema },
        })
        await db.createCollection('results', {
            validator: { $jsonSchema: resultSchema },
        })
        await db.createCollection('allowedUsers', {
            validator: { $jsonSchema: allowedUsersSchema },
        })

        await db
            .collection('students')
            .createIndex({ email: 1 }, { unique: true })

        await db
            .collection('allowedUsers')
            .createIndex({ name: 1 }, { unique: true })

        return db
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default await mongodbConnection()
