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
        }

        ctx.state.result = resultDoc
        return null
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
        }

        return null
    } catch (err) {
        return err.message
    }
}

export const isStudentvalid = async (ctx) => {
    const { result } = ctx.state.student
    if (!result) {
        return 'Invalid Student'
    }
    return null
}

export const isFieldsValid = async (ctx) => {
    const { body } = ctx.request
    const { Marks } = body
    const allowedFields = ['Signed_By', 'studentId', 'Marks']

    // limit number of fields
    if (Object.keys(body).length > allowedFields.length) {
        return 'Invalid amount of fields'
    }

    if (Marks && Marks.length > 10) {
        return 'Result at maximum contains Marks of 10 subjects'
    }

    //check for invalid fields
    const invalidFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field)
    )

    if (invalidFields.length) {
        return 'Invalid field'
    }

    return null
}

export const isStudentIdFieldValid = async (ctx) => {
    try {
        const { studentId } = ctx.request.body
        if (!isValidUuid(studentId)) {
            throw new Error('Invalid student Id')
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

export const isSignedByValid = async (ctx) => {
    const { Signed_By } = ctx.request.body

    if (typeof Signed_By !== 'string' || !Signed_By.trim()) {
        return 'Signed_By should be a non-empty string'
    }

    return null
}

export const areMarksValid = async (ctx) => {
    const { Marks } = ctx.request.body

    if (!Array.isArray(Marks)) {
        return 'Marks should be an array'
    }

    for (const mark of Marks) {
        if (
            typeof mark.subCode !== 'string' ||
            !mark.subCode.trim() ||
            typeof mark.marks !== 'number' ||
            !Number.isInteger(mark.marks)
        ) {
            return 'Invalid format for Marks array'
        }
    }

    return null
}

export const isStudentIdFieldValidIfExists = async (ctx) => {
    try {
        const { studentId } = ctx.request.body

        if (studentId && !isValidUuid(studentId)) {
            throw new Error('Invalid student Id')
        }

        if (studentId) {
            const student = await studentQueries.getOneStudent({ studentId })

            if (!student) {
                throw new Error('Student not found')
            }
        }

        return null
    } catch (err) {
        return err.message
    }
}

export const isSignedByValidIfExists = async (ctx) => {
    const { Signed_By } = ctx.request.body

    if (Signed_By && (typeof Signed_By !== 'string' || !Signed_By.trim())) {
        return 'Signed_By should be a non-empty string'
    }

    return null
}

export const areMarksValidIfExists = async (ctx) => {
    const { Marks } = ctx.request.body

    if (Marks && !Array.isArray(Marks)) {
        return 'Marks should be an array'
    }

    if (Marks) {
        for (const mark of Marks) {
            if (
                typeof mark.subCode !== 'string' ||
                !mark.subCode.trim() ||
                typeof mark.marks !== 'number' ||
                !Number.isInteger(mark.marks)
            ) {
                return 'Invalid format for Marks array'
            }
        }
    }

    return null
}
