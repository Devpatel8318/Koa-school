import encryptPassword from '../helpers/getEncryptedPassword.js'

import * as studentQueries from '../queries/studentQueries.js'

export const doesStudentExistByEmail = async (ctx) => {
    try {
        const { email } = ctx.request.body

        const student = await studentQueries.getOneStudent({ email: email })

        if (!student) {
            throw new Error('Student not found')
        } else {
            ctx.state.student = student
            return null
        }
    } catch (err) {
        return err.message
    }
}

export const isEmailAvailable = async (ctx) => {
    try {
        const { email } = ctx.request.body

        const student = await studentQueries.getOneStudent({ email: email })

        if (student) {
            throw new Error('Email Already Exists')
        } else {
            ctx.state.student = student
            return null
        }
    } catch (err) {
        return err.message
    }
}

export const doesStudentExistById = async (ctx) => {
    try {
        const { id } = ctx.params

        const student = await studentQueries.getOneStudent(
            { studentId: id },
            { projection: { password: 0, _id: 0 } }
        )

        if (!student) {
            throw new Error('Student not found')
        } else {
            ctx.state.student = student
            console.log(ctx.state.student)
            return null
        }
    } catch (err) {
        return err.message
    }
}

export const isPasswordCorrect = async (ctx) => {
    const foundStudent = ctx.state.student
    const { password } = ctx.request.body

    if (encryptPassword(password) !== foundStudent.password) {
        console.log(encryptPassword(password), foundStudent.password)
        return 'Wrong Password'
    } else {
        return null
    }
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
        return 'Invalid amount of fields'
    }

    //check for invalid fields
    const invalidFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field)
    )
    if (invalidFields.length) {
        return 'Invalid field'
    } else {
        return null
    }
}

export const isFirstNameValid = async (ctx) => {
    const { firstName } = ctx.request.body

    if (
        typeof firstName !== 'string' ||
        firstName.length < 6 ||
        firstName.length > 25
    ) {
        return 'First Name should be a string between 6 and 25 characters'
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
        return 'Last Name should be a string between 6 and 25 characters'
    }
    return null
}

export const isEmailValid = async (ctx) => {
    const { email } = ctx.request.body

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
        typeof email !== 'string' ||
        emailPattern.length > 254 ||
        !emailPattern.test(email)
    ) {
        return 'Email should be a valid email address'
    } else {
        return null
    }
}

export const isPasswordValid = async (ctx) => {
    const { password } = ctx.request.body

    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/

    if (
        typeof password !== 'string' ||
        password.length < 6 ||
        !passwordRegex.test(password)
    ) {
        return 'Password should contain at least one uppercase letter, one special character, and one number'
    } else {
        return null
    }
}

export const isFirstNameValidIfExists = async (ctx) => {
    const { firstName } = ctx.request.body

    if (
        firstName &&
        (typeof firstName !== 'string' ||
            firstName.length < 6 ||
            firstName.length > 25)
    ) {
        return 'First Name should be a string between 6 and 25 characters'
    }
    return null
}

export const isLastNameValidIfExists = async (ctx) => {
    const { lastName } = ctx.request.body

    if (
        lastName &&
        (typeof lastName !== 'string' ||
            lastName.length < 6 ||
            lastName.length > 25)
    ) {
        return 'Last Name should be a string between 6 and 25 characters'
    }
    return null
}

export const isEmailValidIfExists = async (ctx) => {
    const { email } = ctx.request.body

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
        email &&
        (typeof email !== 'string' ||
            email.length > 254 ||
            !emailPattern.test(email))
    ) {
        return 'Email should be a valid email address'
    }
    return null
}

export const isPasswordValidIfExists = async (ctx) => {
    const { password } = ctx.request.body

    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/

    if (
        password &&
        (typeof password !== 'string' ||
            password.length < 6 ||
            !passwordRegex.test(password))
    ) {
        return 'Password should contain at least one uppercase letter, one special character, and one number'
    }
    return null
}
