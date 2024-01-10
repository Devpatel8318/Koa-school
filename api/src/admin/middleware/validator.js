import { failureObject } from '../../utils/responseObject.js'
const validator = (validatorFunctions) => {
    return async (ctx, next) => {
        for await (const validatorFn of validatorFunctions) {
            try {
                const validationResult = await validatorFn(ctx)

                if (validationResult) {
                    throw new Error(validationResult)
                }
            } catch (err) {
                ctx.status = 400
                ctx.body = failureObject(err.message , "Validation Failed")
                return
            }
        }
        await next()
    }
}

export default validator
