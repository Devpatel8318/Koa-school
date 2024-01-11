import { successObject } from '../../utils/responseObject.js'

import * as studentQueries from '../queries/studentQueries.js'
import * as resultQueries from '../queries/resultQueries.js'

export const getAllStudents = async (ctx) => {
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

    const students = await studentQueries.getAllStudents(
        filter,
        parseInt(page),
        parseInt(perPage),
        sortOptions
    )

    ctx.body = successObject(students)
}

export const getOneStudent = async (ctx) => {
    const { student } = ctx.state
    ctx.body = successObject(student)
}

export const loginStudent = async (ctx) => {
    const { student } = ctx.state

    delete student.password
    delete student._id

    ctx.body = successObject(student)
}

export const createStudent = async (ctx) => {
    const student = ctx.request.body
    const { encryptedPassword } = ctx.state

    await studentQueries.createOneStudent({
        ...student,
        password: encryptedPassword,
    })

    ctx.body = successObject('Student created.')
}

export const updateStudent = async (ctx) => {
    const updates = ctx.request.body
    const { studentId } = ctx.params

    await studentQueries.updateOneStudent(studentId, { $set: updates })

    ctx.body = successObject('Student updated successfully.')
}

export const deleteStudent = async (ctx) => {
    const { studentId } = ctx.params
    const { result } = ctx.state.student

    await studentQueries.deleteOneStudent(studentId)

    if (result) {
        await resultQueries.deleteOneResult({ resultId: result })
    }

    ctx.body = successObject('Student deleted successfully.')
}
