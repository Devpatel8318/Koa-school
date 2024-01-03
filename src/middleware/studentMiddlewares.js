import db from '../connection/db.js'

export const validLoginCredentials = async (ctx, next) => {
    const { email, password } = ctx.request.body

    if (!password || !email) {
        ctx.throw(400, 'Please provide credentials')
    } else {
        await next()
    }
}

export const doesStudentExistByEmail = async (ctx, next) => {
    const student = await db
        .collection('students')
        .findOne({ email: ctx.request.body.email })

    if (!student) {
        ctx.throw(404, 'Student not found')
    } else {
        ctx.state.student = student
        await next()
    }
}

export const doesStudentExistById = async (ctx, next) => {
    const student = await db
        .collection('students')
        .findOne({ _id: ctx.params.id }, { projection: { password: 0 } })

    if (!student) {
        ctx.throw(404, 'Student not found')
    } else {
        ctx.state.student = student
        await next()
    }
}
