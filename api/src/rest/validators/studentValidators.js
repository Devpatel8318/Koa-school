import * as studentQueries from '../queries/studentQueries.js'

import isEmailValid from '../../utils/isEmailValid.js'
import isPasswordValid from '../../utils/isPasswordValid.js'

export const isLoginCredentialsValid = async (ctx, next) => {
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
            await next()
        }
    } catch (err) {
        ctx.body = {
            success: false,
            reason: err.message,
            message: 'Something went wrong',
        }
    }
}

export const doesStudentExistByEmail = async (ctx, next) => {
    try {
        const { email } = ctx.request.body
        const student = await studentQueries.getOneStudent({ email: email })
        if (!student) {
            throw new Error('Student not found')
        } else {
            ctx.state.student = student
            await next()
        }
    } catch (err) {
        ctx.body = {
            success: false,
            reason: err.message,
            message: 'Something went wrong',
        }
    }
}

export const doesStudentExistById = async (ctx, next) => {
    try {
        const { id } = ctx.params
        const student = await studentQueries.getOneStudent(
            { studentID: id },
            { projection: { password: 0, _id: 0 } }
        )
        if (!student) {
            throw new Error('Student not found')
        } else {
            ctx.state.student = student
            await next()
        }
    } catch (err) {
        ctx.body = {
            success: false,
            reason: err.message,
            message: 'Something went wrong',
        }
    }
}

