import { validate as isValidUuid } from 'uuid'

import * as resultQueries from '../queries/resultQueries.js'
import * as studentQueries from '../queries/studentQueries.js'
import * as subjectQueries from '../queries/subjectQueries.js'

export const doesResultExistById = async (ctx) => {
    const { resultId } = ctx.params

    const resultData = await resultQueries.getOneResult({ resultId })

    if (!resultData) {
        return 'Result not found.'
    }

    ctx.state.result = resultData

    return null
}

export const doesResultExistByIdAndAttach = async (ctx) => {
    const { resultId } = ctx.params

    const resultData = await resultQueries.getOneResult({ resultId })

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

export const doesStudentHaveResult = async (ctx) => {
    const { result } = ctx.state.student

    if (!result) {
        return 'Student do not have Result.'
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

    if (invalidFields && invalidFields.length) {
        return `Invalid Fields: ${invalidFields.join(', ')}.`
    }

    return null
}

export const isStudentIdFieldValid = async (ctx) => {
    const { studentId } = ctx.request.body

    if (!studentId) {
        return 'Please Provide studentId.'
    }

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

    if (!Signed_By) {
        return 'Please Provide Signed_By.'
    }

    if (typeof Signed_By !== 'string') {
        return 'Signed_By must be a string'
    }

    return null
}

//allowing results with no marks
export const isMarksArrayValid = async (ctx) => {
    const { Marks } = ctx.request.body
    const subjectCodes = Marks.map((mark) => mark.subjectCode)

    if (!Array.isArray(Marks)) {
        return 'Marks should be an array.'
    }

    const doesDuplicateSubjectCodesExists =
        new Set(subjectCodes).size !== Marks.length

    if (doesDuplicateSubjectCodesExists) {
        return 'Duplicate Subject Codes entered.'
    }

    const isMarksFormatInvalid = Marks.some(
        (mark) =>
            typeof mark.subjectCode !== 'string' ||
            !mark.subjectCode.trim() ||
            typeof mark.marks !== 'number' ||
            !Number.isInteger(mark.marks) ||
            mark.marks < 0
    )

    if (isMarksFormatInvalid) {
        return 'Invalid Format for Marks.'
    }

    return null
}

export const areSubjectCodesValid = async (ctx) => {
    const { Marks } = ctx.request.body
    const enteredSubjectCodes = Marks.map((mark) => mark.subjectCode)

    const subjects = await subjectQueries.getAllSubjects({
        subjectCode: { $in: enteredSubjectCodes },
    })
    const validSubjectCodes = new Set(
        subjects.map((subject) => subject.subjectCode)
    )

    const invalidSubjectCodes = enteredSubjectCodes.filter(
        (subject) => !validSubjectCodes.has(subject)
    )

    if (invalidSubjectCodes.length) {
        return `Subject does not exist for given code: ${invalidSubjectCodes.join(
            ', '
        )}`
    }

    ctx.state.subjectsMaximumMarks = Object.fromEntries(
        subjects.map((subject) => [subject.subjectCode, subject.maximumMarks])
    )

    return null
}

export const isMarksGreaterThanMaximumMarks = async (ctx) => {
    const { subjectsMaximumMarks } = ctx.state
    const { Marks } = ctx.request.body

    const marksInvalid = Marks.some(
        (oneSubjectMarksData) =>
            oneSubjectMarksData.marks >
            subjectsMaximumMarks[oneSubjectMarksData.subjectCode]
    )

    if (marksInvalid) {
        return "Marks must be Less than Subject's Maximum Marks."
    }

    return null
}

export const isStudentIdChanged = (ctx) => {
    const { studentId: newStudentId } = ctx.request.body
    const { studentId: originalStudentId } = ctx.state.result

    if (newStudentId !== originalStudentId) {
        return "Can't change Student Id"
    }

    return null
}
