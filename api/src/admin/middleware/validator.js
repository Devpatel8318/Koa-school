const validator = (validatorFunctions) => {
    return async (ctx, next) => {
        for await (const validatorFn of validatorFunctions) {
            try {
                const validationResult = await validatorFn(ctx)

                if (validationResult !== null) {
                    throw new Error(validationResult)
                }
            } catch (error) {
                ctx.throw(400, error.message)
            }
        }
        await next()
    }
}

export default validator
