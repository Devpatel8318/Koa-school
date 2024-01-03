import db from '../connection/db.js'
import { passwordEncryption } from '../utils/passwordEncryption.js'

export const getStudents = async (ctx) => {
    try {
        let filter = {}

        if (ctx.query.result === 'false') {
            filter = { result: { $exists: false } }
        }
        if (ctx.query.result === 'true') {
            filter = { result: { $exists: true } }
        }

        const students = await db
            .collection('students')
            .find(filter)
            .project({ password: 0 })
            .toArray()

        ctx.status = 200
        ctx.body = students
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: err }
    }
}
export const getSingleStudent = async (ctx) => {
    try {
        // const studentDoc = await db
        //     .collection('students')
        //     .findOne({ _id: ctx.params.id }, { projection: { password: 0 } })

        // if (!studentDoc) ctx.throw(404, 'Student not found')

        ctx.status = 200
        ctx.body = ctx.state.student
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const loginStudent = async (ctx) => {
    try {
        const student = ctx.state.student

        if (student.password !== passwordEncryption(ctx.request.body.password))
            ctx.throw(401, 'Wrong password')

        delete student.password

        ctx.status = 200
        ctx.body = student
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const createStudent = async (ctx) => {
    try {
        const student = ctx.request.body
        if (!student.password) ctx.throw(400, 'Please provide a password')

        const encryptedPassword = passwordEncryption(student.password)

        if (encryptedPassword === false) {
            ctx.throw(
                400,
                'Password should contain at least one uppercase letter, one special character, and one number'
            )
        } else {
            student.password = encryptedPassword
        }

        const studentDoc = await db.collection('students').insertOne(student)

        if (!studentDoc || !studentDoc.insertedId) {
            ctx.throw(500, 'Failed to create the student')
        }

        ctx.status = 201
        ctx.body = studentDoc.insertedId
    } catch (err) {
        if (err.code === 11000) {
            ctx.throw(409, 'Email already exists')
        }
        ctx.status = 400
        ctx.body = err.errInfo || err
    }
}

export const updateStudent = async (ctx) => {
    const updates = ctx.request.body
    try {
        const updatedStudent = await db
            .collection('students')
            .updateOne({ _id: ctx.params.id }, { $set: updates })

        if (updatedStudent.matchedCount === 0)
            ctx.throw(404, 'Student not found')

        ctx.status = 200
        ctx.body = { message: 'Student updated successfully' }
    } catch (err) {
        ctx.status = err.status || 400
        ctx.body = err.errInfo || err
    }
}

export const deleteStudent = async (ctx) => {
    try {
        const studentId = ctx.params.id
        const foundStudentDoc = await db
            .collection('students')
            .findOne({ _id: studentId }, { projection: { result: 1 } })

        if (!foundStudentDoc) ctx.throw(404, 'Student not found')

        const studentDoc = await db
            .collection('students')
            .deleteOne({ _id: studentId })

        if (studentDoc.deletedCount === 0) {
            ctx.throw(404, 'Student not found')
        }

        if (foundStudentDoc.result) {
            const deleteResult = await db
                .collection('results')
                .deleteOne({ _id: foundStudentDoc.result })

            if (deleteResult.deletedCount === 0) {
                ctx.throw(404, 'Result of student not deleted')
            }
        }

        ctx.status = 200
        ctx.body = { message: 'Student deleted successfully' }
    } catch (err) {
        ctx.status = 500
        ctx.body = { error: 'Internal server error' }
    }
}
