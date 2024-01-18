import * as allowedUsersQueries from '../queries/allowedUsersQueries.js'

export const doesUserExistByName = async (ctx) => {
    const { name } = ctx.params

    const user = await allowedUsersQueries.getAllAllowedUsers({ name })

    if (user && !user.length) {
        return 'User Not Found.'
    }

    return null
}

export const doesUserExistByNameAndAttach = async (ctx) => {
    const { list, name } = ctx.request.query

    if (list === 'all') {
        return null
    }

    if (list !== 'single') {
        return 'Invalid Request'
    }

    if (!name) {
        return 'Please Provide Name'
    }

    const user = await allowedUsersQueries.getAllAllowedUsers({ name })

    if (user && !user.length) {
        return 'User Not Found.'
    }

    ctx.state.user = user

    return null
}

export const isNameAlreadyAdded = async (ctx) => {
    const { name } = ctx.request.body

    const user = await allowedUsersQueries.getAllAllowedUsers({ name })

    if (user && user.length) {
        return 'User already exists.'
    }

    return null
}

export const isPassKeyPresent = async (ctx) => {
    const { passKey } = ctx.request.body

    if (!passKey) {
        return 'Please Provide PassKey'
    }

    if (typeof passKey !== 'string') {
        return 'Passkey Must be a String'
    }
}

export const isPassKeyCorrect = async (ctx) => {
    const { passKey } = ctx.request.body
    if (passKey !== process.env.PASSKEY) {
        return 'Wrong Password.'
    }

    return null
}

export const isCreateFieldsValid = async (ctx) => {
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
        return `Invalid Fields: ${invalidFields.join(', ')}.`
    }

    return null
}
export const isLoginFieldsValid = async (ctx) => {
    const { body } = ctx.request
    const allowedFields = ['passKey']

    // limit number of fields
    if (Object.keys(body).length > allowedFields.length) {
        return 'Invalid amount of fields.'
    }

    //check for invalid fields
    const invalidFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field)
    )

    if (invalidFields && invalidFields.length) {
        return `Invalid Field: ${invalidFields[0]}.`
    }

    return null
}

export const isNameValid = async (ctx) => {
    const { name } = ctx.request.body

    if (!name) {
        return 'Please Provide Name.'
    }

    if (typeof name !== 'string') {
        return 'Name must be a String.'
    }

    return null
}
