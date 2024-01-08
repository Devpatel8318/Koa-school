import { deleteOneResult } from '../queries/resultQueries.js'
import {
    createOneStudent,
    deleteOneStudent,
    findAllStudents,
} from '../queries/studentQueries.js'

export const getStudents = async (ctx) => {
    const response = {}
    try {
        let filter = {}
        let sortOptions = {}
        const { sortBy, sortOrder, page, perPage, result } = ctx.query

        if (result === 'false') {
            filter = { result: { $exists: false } }
        }
        if (result === 'true') {
            filter = { result: { $exists: true } }
        }

        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1
        }

        const students = await findAllStudents(
            filter,
            parseInt(page),
            parseInt(perPage),
            sortOptions
        )

        response.success = true
        response.data = students
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const getSingleStudent = async (ctx) => {
    const response = {}
    response.success = true
    response.data = ctx.state.student
    response.message = 'data displayed successfully.'
    ctx.body = response
}

export const loginStudent = async (ctx) => {
    const response = {}
    const foundStudent = ctx.state.student

    if (foundStudent.password !== ctx.request.body.password) {
        response.success = false
        response.reason = 'Wrong Password'
        response.message = 'Something went wrong'
    } else {
        delete foundStudent.password
        response.success = true
        response.data = foundStudent
        response.message = 'data displayed successfully.'
    }
    ctx.body = response
}

export const createStudent = async (ctx) => {
    const response = {}
    try {
        const student = ctx.request.body

        const studentDoc = await createOneStudent(student)

        if (!studentDoc || !studentDoc.insertedId) {
            throw new Error('Failed to create the student')
        }

        response.success = true
        response.data = studentDoc.insertedId
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason =
            err.code === 11000 ? 'Email already exists' : err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const updateStudent = async (ctx) => {
    const response = {}
    const updates = ctx.request.body
    try {
        await updateStudent(ctx.params.id, updates)
        response.success = true
        response.data = 'Student updated successfully'
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.errInfo || err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}

export const deleteStudent = async (ctx) => {
    try {
        await deleteOneStudent(ctx.params.id)

        if (ctx.state.student.result) {
            await deleteOneResult({
                _id: ctx.state.student.result,
            })
        }

        response.success = true
        response.data = 'Student deleted successfully'
        response.message = 'data displayed successfully.'
    } catch (err) {
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
    }
    ctx.body = response
}
