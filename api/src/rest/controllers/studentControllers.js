import { v4 as uuidv4 } from 'uuid'

import { successObject } from '../../utils/responseObject.js'
import * as studentQueries from '../queries/studentQueries.js'
import * as resultQueries from '../queries/resultQueries.js'
import encryptPassword from '../helpers/getEncryptedPassword.js'

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
    const { firstName, lastName, password, email } = ctx.request.body
    const studentId = uuidv4()

    const newStudentData = {
        studentId,
        firstName,
        lastName,
        email,
        password: encryptPassword(password),
    }

    await studentQueries.createOneStudent(newStudentData)

    ctx.body = successObject(studentId, 'Student created.')
}

export const updateStudent = async (ctx) => {
    const { firstName, lastName, email, password } = ctx.request.body
    const { studentId } = ctx.params

    const changedStudentData = {
        studentId,
        firstName,
        lastName,
        email,
        password,
    }

    await studentQueries.updateOneStudent(studentId, {
        $set: changedStudentData,
    })

    ctx.body = successObject(studentId, 'Student updated successfully.')
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
