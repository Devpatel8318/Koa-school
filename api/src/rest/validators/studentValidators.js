import * as studentQueries from '../queries/studentQueries.js'

import encryptPassword from '../helpers/getEncryptedPassword.js'
import emailValidator from '../helpers/emailValidator.js'
import passwordValidator from '../helpers/passwordValidator.js'

export const doesStudentExistByEmail = async (ctx) => {
    const { email } = ctx.request.body

    const student = await studentQueries.getOneStudent({ email })

    if (!student) {
        return 'Student not found.'
    }

    ctx.state.student = student
    return null
}

export const isEmailAvailable = async (ctx) => {
    const { email } = ctx.request.body

    const student = await studentQueries.getOneStudent({ email })

    if (student) {
        return 'Email Already Exists.'
    }

    ctx.state.student = student
    return null
}

export const doesStudentExistById = async (ctx) => {
    const { studentId } = ctx.params

    const student = await studentQueries.getOneStudent({ studentId })

    if (!student) {
        return 'Student not found.'
    }

    return null
}

export const doesStudentExistByIdAndAttach = async (ctx) => {
    const { studentId } = ctx.params

    const student = await studentQueries.getOneStudent(
        { studentId },
        { projection: { password: 0, _id: 0 } }
    )

    if (!student) {
        return 'Student not found.'
    }

    ctx.state.student = student
    return null
}

export const isPasswordCorrect = async (ctx) => {
    const foundStudent = ctx.state.student
    const { password } = ctx.request.body

    if (encryptPassword(password) !== foundStudent.password) {
        return 'Wrong Password.'
    }

    return null
}

export const isFieldsValid = async (ctx) => {
    const { body } = ctx.request
    const allowedFields = [
        'firstName',
        'lastName',
        'password',
        'email',
        'result',
    ]

    //limit number of fields
    if (Object.keys(body).length > allowedFields.length) {
        return 'Invalid amount of fields.'
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

export const isFirstNameValid = async (ctx) => {
    const { firstName } = ctx.request.body

    if (
        typeof firstName !== 'string' ||
        firstName.length < 6 ||
        firstName.length > 25
    ) {
        return 'First Name should be a string between 6 and 25 characters.'
    }

    return null
}

export const isLastNameValid = async (ctx) => {
    const { lastName } = ctx.request.body

    if (
        typeof lastName !== 'string' ||
        lastName.length < 6 ||
        lastName.length > 25
    ) {
        return 'Last Name should be a string between 6 and 25 characters.'
    }

    return null
}

export const isEmailValid = async (ctx) => {
    const { email } = ctx.request.body

    if (!emailValidator(email)) {
        return 'Email should be a valid email address.'
    }

    return null
}

export const isPasswordValid = async (ctx) => {
    const { password } = ctx.request.body

    if (!passwordValidator(password)) {
        return 'Password should contain at least one uppercase letter, one special character, and one number.'
    }

    return null
}
