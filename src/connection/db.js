import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
config()

import studentSchema from '../schema/studentSchema.js'
import subjectSchema from '../schema/subjectSchema.js'
import resultSchema from '../schema/resultSchema.js'

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

        await db
            .collection('students')
            .createIndex({ email: 1 }, { unique: true })

        return db
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default await mongodbConnection()
