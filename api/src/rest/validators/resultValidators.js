import { validate as isValidUuid } from 'uuid'
import * as resultQueries from '../queries/resultQueries.js'
import * as studentQueries from '../queries/studentQueries.js'

export const doesResultExistById = async (ctx) => {
    try {
        const { id } = ctx.params

        const resultDoc = await resultQueries.getOneResult({
            resultId: id,
        })

        if (!resultDoc) {
            throw new Error('Result not found')
        } else {
            ctx.state.result = resultDoc
            return null
        }
    } catch (err) {
        return err.message
    }
}

export const doesStudentAlreadyHaveResult = async (ctx) => {
    try {
        const { studentId } = ctx.request.body

        const resultDoc = await resultQueries.getOneResult({ studentId })

        if (resultDoc) {
            throw new Error('Result for student already exists')
        } else {
            ctx.state.result = resultDoc
            return null
        }
    } catch (err) {
        return err.message
    }
}

export const isstudentIdValid = async (ctx) => {
    const { id } = ctx.params
    if (!isValidUuid(id)) {
        return 'Invalid UUID'
    } else {
        return null
    }
}

export const isStudentvalid = async (ctx) => {
    const { result } = ctx.state.student
    if (!result) {
        return 'Invalid Student'
    } else {
        return null
    }
}
export const isFieldsValid = async (ctx) => {
    const { body } = ctx.request
    const allowedFields = ['Signed_By', 'studentId', 'Marks']

    // limit number of fields
    if (Object.keys(body).length > allowedFields.length) {
        return 'Invalid amount of fields'
    }

    //check for invalid fields
    const invalidFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field)
    )
    if (invalidFields.length > 0) {
        return 'Invalid field'
    } else {
        return null
    }
}
export const isStudentIdFieldValid = async (ctx) => {
    try {
        const { studentId } = ctx.request.body
        if (!isValidUuid(studentId)) {
            throw new Error('Invalid student UUID')
        }

        const student = await studentQueries.getOneStudent({ studentId })

        if (!student) {
            throw new Error('Student not found')
        } else {
            return null
        }
    } catch (err) {
        return err.message
    }
}
