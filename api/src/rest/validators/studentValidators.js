import { findOneStudent } from '../queries/studentQueries.js'
import { passwordEncryption } from '../helpers/passwordEncryption.js'

export const validLoginCredentials = async (ctx, next) => {
    try {
        const { email, password } = ctx.request.body

        if (!password || !email) {
            throw new Error('Please provide credentials')
        } else {
            await next()
        }
    } catch (err) {
        const response = {}
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
        ctx.body = response
    }
}

export const doesStudentExistByEmail = async (ctx, next) => {
    try {
        const student = await findOneStudent({ email: ctx.request.body.email })
        if (!student) {
            throw new Error('Student not found')
        } else {
            ctx.state.student = student
            await next()
        }
    } catch (err) {
        const response = {}
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
        ctx.body = response
    }
}

export const doesStudentExistById = async (ctx, next) => {
    try {
        const student = await findOneStudent(
            { _id: ctx.params.id },
            { projection: { password: 0 } }
        )
        if (!student) {
            throw new Error(404, 'Student not found')
        } else {
            ctx.state.student = student
            await next()
        }
    } catch (err) {
        const response = {}
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
        ctx.body = response
    }
}

export const validateAndEncryptPassword = async (ctx, next) => {
    try {
        const student = ctx.request.body
        const encryptedPassword = passwordEncryption(student.password)
        if (encryptedPassword === false) {
            throw new Error(
                'Password should contain at least one uppercase letter, one special character, and one number'
            )
        } else {
            ctx.request.body.password = encryptedPassword
            await next()
        }
    } catch (err) {
        const response = {}
        response.success = false
        response.reason = err.message
        response.message = 'Something went wrong'
        ctx.body = response
    }
}
