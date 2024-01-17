import isEmailPatternValid from '../../utils/isEmailPatternValid.js'
import isPasswordPatternValid from '../../utils/isPasswordPatternValid.js'

import * as studentQueries from '../queries/studentQueries.js'

import encryptPassword from '../helpers/getEncryptedPassword.js'

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

    if (!firstName) {
        return 'Please Provide First Name.'
    }

    if (typeof firstName !== 'string') {
        return 'First Name must be a String.'
    }

    if (firstName.length > 25) {
        return 'First Name must be less than 25 characters.'
    }

    if (firstName.length < 6) {
        return 'First Name must be more than 6 characters.'
    }

    return null
}

export const isLastNameValid = async (ctx) => {
    const { lastName } = ctx.request.body

    if (!lastName) {
        return 'Please Provide Last Name.'
    }

    if (typeof lastName !== 'string') {
        return 'Last Name must be a String.'
    }

    if (lastName.length > 25) {
        return 'Last Name must be less than 25 characters.'
    }

    if (lastName.length < 6) {
        return 'Last Name must be more than 6 characters.'
    }

    return null
}

export const isEmailValid = async (ctx) => {
    const { email } = ctx.request.body

    if (!email) {
        return 'Please Provide Email.'
    }

    if (typeof email !== 'string') {
        return 'Email must be a String.'
    }

    if (email.length > 254) {
        return 'Email must be less than 254 characters.'
    }

    if (!isEmailPatternValid(email)) {
        return 'Email should be a valid email address.'
    }

    return null
}

export const isPasswordValid = async (ctx) => {
    const { password } = ctx.request.body

    if (!password) {
        return 'Please Provide Password.'
    }

    if (typeof password !== 'string') {
        return 'Password must be a String.'
    }

    if (password.length < 6) {
        return 'Password Name must be more than 6 characters.'
    }

    if (!isPasswordPatternValid(password)) {
        return 'Password should contain at least one uppercase letter, one special character, and one number.'
    }

    return null
}
