import encryptedPassword from '../helpers/getEncryptedPassword.js'

export const encryptPassword = async (ctx, next) => {
    try {
        const { password } = ctx.request.body
        ctx.state.encryptedPassword = encryptedPassword(password)
        await next()
    } catch (err) {
        ctx.body = {
            success: false,
            reason: err.message,
            message: 'Something went wrong',
        }
    }
}
