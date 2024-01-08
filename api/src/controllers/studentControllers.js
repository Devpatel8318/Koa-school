import { deleteOneResult } from '../queries/resultQueries.js'
import {
    createOneStudent,
    deleteOneStudent,
    findAllStudents,
} from '../queries/studentQueries.js'

export const getStudents = async (ctx) => {
    try {
        const page = parseInt(ctx.query.page)
        const perPage = parseInt(ctx.query.perPage) 
        let filter = {}
        let sortOptions = {}

        if (ctx.query.result === 'false') {
            filter = { result: { $exists: false } }
        }
        if (ctx.query.result === 'true') {
            filter = { result: { $exists: true } }
        }

        if (ctx.query.sortBy && ctx.query.sortOrder) {
            const sortOrder =
                ctx.query.sortOrder.toLowerCase() === 'desc' ? -1 : 1
            sortOptions[ctx.query.sortBy] = sortOrder
        }

        const students = await findAllStudents(
            filter,
            page,
            perPage,
            sortOptions
        )

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
    const foundStudent = ctx.state.student

    if (foundStudent.password !== ctx.request.body.password)
        ctx.throw(401, 'Wrong password')

    delete foundStudent.password

    ctx.status = 200
    ctx.body = foundStudent
}

export const createStudent = async (ctx) => {
    try {
        const student = ctx.request.body

        const studentDoc = await createOneStudent(student)

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
        await updateStudent(ctx.params.id, updates)
        ctx.status = 200
        ctx.body = { message: 'Student updated successfully' }
    } catch (err) {
        ctx.status = err.status || 400
        ctx.body = err.errInfo || err
    }
}

export const deleteStudent = async (ctx) => {
    try {
        await deleteOneStudent(ctx.params.id)

        if (ctx.state.student.result) {
            const deletedResult = await deleteOneResult({
                _id: ctx.state.student.result,
            })
            if (deletedResult.deletedCount === 0) {
                ctx.throw(404, 'Result of student not deleted')
            }
        }

        ctx.status = 200
        ctx.body = { message: 'Student deleted successfully' }
    } catch (err) {
        console.log(err)
        ctx.status = 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}
