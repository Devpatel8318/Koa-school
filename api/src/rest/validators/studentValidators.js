import isEmailValid from '../../utils/isEmailValid.js'
import isPasswordValid from '../../utils/isPasswordValid.js'

import encryptPassword from '../helpers/getEncryptedPassword.js'

import * as studentQueries from '../queries/studentQueries.js'

export const isLoginCredentialsValid = async (ctx) => {
    try {
        const { email, password } = ctx.request.body

        if (!password || !email) {
            throw new Error('Please provide credentials')
        }
        if (!isEmailValid(email)) {
            throw new Error('Please provide valid Email')
        }
        if (!isPasswordValid(password)) {
            throw new Error(
                'Password should contain at least one uppercase letter, one special character, and one number'
            )
        }
        return null
    } catch (err) {
        return err.message
    }
}

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
