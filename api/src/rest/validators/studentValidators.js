import * as studentQueries from '../queries/studentQueries.js'

import isEmailValid from '../../utils/isEmailValid.js'
import isPasswordValid from '../../utils/isPasswordValid.js'

export const isLoginCredentialsValid = async (ctx) => {
    try {
        const { email, password } = ctx.request.body

        if (!password || !email) {
            throw new Error('Please provide credentials')
        } else if (!isEmailValid(email)) {
            throw new Error('Please provide valid Email')
        } else if (!isPasswordValid(password)) {
            throw new Error(
                'Password should contain at least one uppercase letter, one special character, and one number'
            )
        } else {
            return null
        }
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
    const { encryptedPassword } = ctx.state

    if (encryptedPassword !== foundStudent.password) {
        return 'Wrong Password'
    } else {
        delete ctx.state.student.password
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
    if (invalidFields.length > 0) {
        return 'Invalid field'
    } else {
        return null
    }
}
