import encryptedPassword from '../helpers/getEncryptedPassword.js'

export const encryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body

    ctx.state.encryptedPassword = encryptedPassword(password)

    await next()
}
