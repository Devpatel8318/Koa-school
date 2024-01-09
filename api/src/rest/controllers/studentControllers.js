import * as studentQueries from '../queries/studentQueries.js'

import * as resultQueries from '../queries/resultQueries.js'

import { failureObject, successObject } from '../../utils/responseObject.js'

export const getAllStudents = async (ctx) => {
    let response = {}
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

        const students = await studentQueries.getAllStudents(
            filter,
            parseInt(page),
            parseInt(perPage),
            sortOptions
        )

        response = successObject(students)
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}

export const getOneStudent = async (ctx) => {
    const { student } = ctx.state
    ctx.body = successObject(student)
}

export const loginStudent = async (ctx) => {
    let response = {}
    const foundStudent = ctx.state.student
    const { password } = ctx.request.body

    if (password !== foundStudent.password) {
        response = failureObject('Wrong Password')
    } else {
        delete foundStudent.password
        response = successObject(foundStudent)
    }
    ctx.body = response
}

export const createStudent = async (ctx) => {
    let response = {}
    try {
        const student = ctx.request.body

        await studentQueries.createOneStudent(student)

        response = successObject('Student created')
    } catch (err) {
        response = failureObject(
            err.code === 11000 ? 'Email already exists' : err.message
        )
    }
    ctx.body = response
}

export const updateStudent = async (ctx) => {
    let response = {}
    try {
        const updates = ctx.request.body
        const { id } = ctx.params
        await studentQueries.updateOneStudent(id, { $set: updates })
        response = successObject('Student updated successfully')
    } catch (err) {
        response = failureObject(err.errInfo || err.message)
    }
    ctx.body = response
}

export const deleteStudent = async (ctx) => {
    let response = {}
    try {
        const { id } = ctx.params
        const { result } = ctx.state.student
        await studentQueries.deleteOneStudent(id)

        if (result) {
            await resultQueries.deleteOneResult({
                resultId: result,
            })
        }
        response = successObject('Student deleted successfully')
    } catch (err) {
        response = failureObject(err.message)
    }
    ctx.body = response
}
