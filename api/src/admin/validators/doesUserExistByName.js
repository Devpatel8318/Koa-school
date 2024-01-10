import { failureObject } from '../../utils/responseObject.js'
import * as allowedUsersQueries from '../queries/allowedUsersQueries.js'

export const doesUserExistByName = async (ctx, next) => {
    const { name } = ctx.params
    try {
        const user = await allowedUsersQueries.getUserByName(name)
        if (!user) {
            ctx.throw(404, 'User Not Found')
        } else {
            ctx.state.user = user
            await next()
        }
    } catch (err) {
        ctx.body = failureObject(err.message)
    }
}
export const isNameAlreadyAdded = async (ctx, next) => {
    const { name } = ctx.params
    try {
        const user = await allowedUsersQueries.getUserByName(name)
        if (user) {
            ctx.throw(404, 'User already exists')
        } else {
            ctx.state.user = user
            await next()
        }
    } catch (err) {
        ctx.body = failureObject(err.message)
    }
}
