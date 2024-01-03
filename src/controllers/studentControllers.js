import db from '../connection/db.js'

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
    ctx.status = 200
    ctx.body = ctx.state.student
}

export const loginStudent = async (ctx) => {
    try {
        const foundStudent = ctx.state.student

        if (foundStudent.password !== ctx.request.body.password)
            ctx.throw(401, 'Wrong password')

        delete foundStudent.password

        ctx.status = 200
        ctx.body = foundStudent
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const createStudent = async (ctx) => {
    try {
        const student = ctx.request.body

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
        await db
            .collection('students')
            .updateOne({ _id: ctx.params.id }, { $set: updates })

        ctx.status = 200
        ctx.body = { message: 'Student updated successfully' }
    } catch (err) {
        ctx.status = err.status || 400
        ctx.body = err.errInfo || err
    }
}

export const deleteStudent = async (ctx) => {
    try {
        await db.collection('students').deleteOne({ _id: ctx.params.id })

        if (ctx.state.student.result) {
            const deleteResult = await db
                .collection('results')
                .deleteOne({ _id: ctx.state.student.result })

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
