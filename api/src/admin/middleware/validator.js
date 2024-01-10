const validator = (validatorFunctions) => {
    return async (ctx, next) => {
        for await (const validatorFn of validatorFunctions) {
            try {
                const validationResult = await validatorFn(ctx)

                if (validationResult) {
                    throw new Error(validationResult)
                }
            } catch (err) {
                ctx.throw(400, err.message)
            }
        }
        await next()
    }
}

export default validator
