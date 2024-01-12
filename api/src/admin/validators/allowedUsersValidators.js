import * as allowedUsersQueries from '../queries/allowedUsersQueries.js'

export const doesUserExistByName = async (ctx) => {
    const { name } = ctx.params

    const user = await allowedUsersQueries.getUserByName(name)

    if (!user) {
        return 'User Not Found.'
    }

    return null
}

export const doesUserExistByNameAndAttach = async (ctx) => {
    const { name } = ctx.params

    const user = await allowedUsersQueries.getUserByName(name)

    if (!user) {
        return 'User Not Found.'
    }

    ctx.state.user = user
    return null
}

export const isNameAlreadyAdded = async (ctx) => {
    const { name } = ctx.request.body

    const user = await allowedUsersQueries.getUserByName(name)

    if (user) {
        return 'User already exists.'
    }

    return null
}

export const isPassKeyCorrect = async (ctx) => {
    const { passKey } = ctx.request.body

    if (passKey !== process.env.PASSKEY) {
        return 'Wrong Password.'
    }

    return null
}

export const isFieldValid = async (ctx) => {
    const { body } = ctx.request
    const allowedFields = ['name']

    // limit number of fields
    if (Object.keys(body).length > allowedFields.length) {
        return 'Invalid amount of fields.'
    }

    //check for invalid fields
    const invalidFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field)
    )

    if (invalidFields && invalidFields.length) {
        return 'Invalid field: name'
    }

    return null
}

export const isNameValid = async (ctx) => {
    const { name } = ctx.request.body

    if (typeof name !== 'string' || !name.trim()) {
        return 'Name should be a non-empty string.'
    }

    return null
}
