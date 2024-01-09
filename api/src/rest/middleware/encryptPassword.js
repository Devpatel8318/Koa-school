import encryptedPassword from '../helpers/getEncryptedPassword.js'
export const encryptPassword = async (ctx, next) => {
    try {
        ctx.request.body.password = encryptedPassword(ctx.request.body.password)
        await next()
    } catch (err) {
        ctx.body = {
            success: false,
            reason: err.message,
            message: 'Something went wrong',
        }
    }
}
