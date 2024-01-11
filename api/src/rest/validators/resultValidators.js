import { validate as isValidUuid } from 'uuid'

import * as resultQueries from '../queries/resultQueries.js'
import * as studentQueries from '../queries/studentQueries.js'
import * as subjectQueries from '../queries/subjectQueries.js'

export const doesResultExistById = async (ctx) => {
    const { id } = ctx.params

    const resultData = await resultQueries.getOneResult({
        resultId: id,
    })

    if (!resultData) {
        return 'Result not found.'
    }

    return null
}

export const doesResultExistByIdAndAttach = async (ctx) => {
    const { id } = ctx.params

    const resultData = await resultQueries.getOneResult({
        resultId: id,
    })

    if (!resultData) {
        return 'Result not found.'
    }

    ctx.state.result = resultData
    return null
}

export const doesStudentAlreadyHaveResult = async (ctx) => {
    const { studentId } = ctx.request.body

    const resultData = await resultQueries.getOneResult({ studentId })

    if (resultData) {
        return 'Result for student already exists.'
    }

    return null
}

export const isStudentvalid = async (ctx) => {
    const { result } = ctx.state.student

    if (!result) {
        return 'Invalid Student.'
    }

    return null
}

export const isFieldsValid = async (ctx) => {
    const { body } = ctx.request
    const { Marks } = body
    const allowedFields = ['Signed_By', 'studentId', 'Marks']

    // limit number of fields
    if (Object.keys(body).length > allowedFields.length) {
        return 'Invalid amount of fields.'
    }

    if (Marks && Marks.length > 10) {
        return 'Result At maximum contains Marks of 10 subjects.'
    }

    //check for invalid fields
    const invalidFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field)
    )

    if (invalidFields.length) {
        return 'Invalid field.'
    }

    return null
}

export const isStudentIdFieldValid = async (ctx) => {
    const { studentId } = ctx.request.body

    if (!isValidUuid(studentId)) {
        return 'Invalid student Id.'
    }

    const student = await studentQueries.getOneStudent({ studentId })

    if (!student) {
        return 'Student not found.'
    }

    return null
}

export const isSignedByValid = async (ctx) => {
    const { Signed_By } = ctx.request.body

    if (typeof Signed_By !== 'string' || !Signed_By.trim()) {
        return 'Signed_By should be a non-empty string.'
    }

    return null
}

export const areMarksValid = async (ctx) => {
    const { Marks } = ctx.request.body
    let isMarksFormatInvalid = false

    if (!Array.isArray(Marks)) {
        return 'Marks should be an array.'
    }

    Marks.forEach((mark) => {
        if (
            typeof mark.subCode !== 'string' ||
            !mark.subCode.trim() ||
            typeof mark.marks !== 'number' ||
            !Number.isInteger(mark.marks)
        ) {
            isMarksFormatInvalid = true
        }
    })

    if (isMarksFormatInvalid) {
        return 'Invalid Format for Marks.'
    }

    return null
}
export const doesSubjectExist = async (ctx) => {
    const { Marks } = ctx.request.body

    const subCodes = Marks.map((Mark) => Mark.subCode)

    const promisesArray = subCodes.map((subcode) =>
        subjectQueries.getSubjectByCode(subcode)
    )

    const promiseResponseData = await Promise.all(promisesArray)

    const isAnySubjectCodeInvalid = promiseResponseData.includes(null)

    if (isAnySubjectCodeInvalid) {
        return 'Subject does not exist for given Subject Code.'
    }

    return null
}

export const isStudentIdFieldValidIfExists = async (ctx) => {
    const { studentId } = ctx.request.body

    if (studentId && !isValidUuid(studentId)) {
        return 'Invalid student Id.'
    }

    if (studentId) {
        const student = await studentQueries.getOneStudent({ studentId })

        if (!student) {
            return 'Student not found.'
        }
    }

    return null
}

export const isSignedByValidIfExists = async (ctx) => {
    const { Signed_By } = ctx.request.body

    if (Signed_By && (typeof Signed_By !== 'string' || !Signed_By.trim())) {
        return 'Signed_By should be a non-empty string.'
    }

    return null
}

export const areMarksValidIfExists = async (ctx) => {
    const { Marks } = ctx.request.body
    let isMarksFormatInvalid = false

    if (Marks && !Array.isArray(Marks)) {
        return 'Marks should be an array.'
    }

    if (Marks) {
        Marks.forEach((mark) => {
            if (
                typeof mark.subCode !== 'string' ||
                !mark.subCode.trim() ||
                typeof mark.marks !== 'number' ||
                !Number.isInteger(mark.marks)
            ) {
                isMarksFormatInvalid = true
            }
        })
    }

    if (isMarksFormatInvalid) {
        return 'Invalid Format for Marks.'
    }

    return null
}
