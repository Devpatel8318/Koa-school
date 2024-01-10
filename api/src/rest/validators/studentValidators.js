import * as studentQueries from '../queries/studentQueries.js'

import isEmailValid from '../../utils/isEmailValid.js'
import isPasswordValid from '../../utils/isPasswordValid.js'
import { failureObject } from '../../utils/responseObject.js'

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
        ctx.body = failureObject(err.message)
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
        ctx.body = failureObject(err.message)
    }
}

export const isEmailAvailable = async (ctx, next) => {
    try {
        const { email } = ctx.request.body
        const student = await studentQueries.getOneStudent({ email: email })
        if (student) {
            throw new Error('Email Already Exists')
        } else {
            ctx.state.student = student
            await next()
        }
    } catch (err) {
        ctx.body = failureObject(err.message)
    }
}

export const doesStudentExistById = async (ctx, next) => {
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
            await next()
        }
    } catch (err) {
        ctx.body = failureObject(err.message)
    }
}

export const isPasswordCorrect = async (ctx, next) => {
    const foundStudent = ctx.state.student
    const { encryptedPassword } = ctx.state

    if (encryptedPassword !== foundStudent.password) {
        ctx.body = failureObject('Wrong Password')
    } else {
        delete ctx.state.student.password
        await next()
    }
}
