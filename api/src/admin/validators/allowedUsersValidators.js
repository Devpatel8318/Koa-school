import * as allowedUsersQueries from '../queries/allowedUsersQueries.js'

export const doesUserExistByName = async (ctx) => {
    const { name } = ctx.params
    try {
        const user = await allowedUsersQueries.getUserByName(name)

        if (!user) {
            throw new Error('User Not Found')
        } else {
            ctx.state.user = user
            return null
        }
    } catch (err) {
        return err.message
    }
}

export const isNameAlreadyAdded = async (ctx) => {
    const { name } = ctx.request.body
    try {
        const user = await allowedUsersQueries.getUserByName(name)

        console.log(user)
        if (user) {
            throw new Error('Allowed user already exists')
        } else {
            ctx.state.user = user
            return null
        }
    } catch (err) {
        return err.message
    }
}

export const isPassKeyCorrect = async (ctx) => {
    const { passKey } = ctx.request.body

    if (passKey !== process.env.PASSKEY) {
        return 'Wrong Password'
    } else {
        return null
    }
}

export const isFieldsValid = async (ctx) => {
    const { body } = ctx.request
    const allowedFields = ['name']

    // limit number of fields
    if (Object.keys(body).length > allowedFields.length) {
        return 'Invalid amount of fields'
    }

    //check for invalid fields
    const invalidFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field)
    )

    if (invalidFields.length > 0) {
        return 'Invalid field'
    } else {
        return null
    }
}
