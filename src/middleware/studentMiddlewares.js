import db from '../connection/db.js'
import { passwordEncryption } from '../utils/passwordEncryption.js'

export const validLoginCredentials = async (ctx, next) => {
    try {
        const { email, password } = ctx.request.body

        if (!password || !email) {
            ctx.throw(400, 'Please provide credentials')
        } else {
            await next()
        }
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const doesStudentExistByEmail = async (ctx, next) => {
    try {
        const student = await db
            .collection('students')
            .findOne({ email: ctx.request.body.email })

        if (!student) {
            ctx.throw(404, 'Student not found')
        } else {
            ctx.state.student = student
            await next()
        }
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const doesStudentExistById = async (ctx, next) => {
    try {
        const student = await db
            .collection('students')
            .findOne({ _id: ctx.params.id }, { projection: { password: 0 } })

        if (!student) {
            ctx.throw(404, 'Student not found')
        } else {
            ctx.state.student = student
            await next()
        }
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}

export const validateAndEncryptPassword = async (ctx, next) => {
    try {
        const student = ctx.request.body
        const encryptedPassword = passwordEncryption(student.password)
        if (encryptedPassword === false) {
            ctx.throw(
                400,
                'Password should contain at least one uppercase letter, one special character, and one number'
            )
        } else {
            ctx.request.body.password = encryptedPassword
            await next()
        }
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || 'Internal server error' }
    }
}
