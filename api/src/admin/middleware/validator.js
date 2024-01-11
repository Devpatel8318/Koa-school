import { failureObject } from '../../utils/responseObject.js'

const validator = (validatorFunctions) => {
    return async (ctx, next) => {
        for await (const validatorFn of validatorFunctions) {
            const validationResult = await validatorFn(ctx)

            if (validationResult) {
                ctx.status = 400
                ctx.body = failureObject(validationResult, 'Validation Failed.')
                return
            }
        }
        await next()
    }
}

export default validator
