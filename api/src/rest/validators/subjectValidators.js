import * as subjectQueries from '../queries/subjectQueries.js'

export const doesSubjectExistByCode = async (ctx) => {
    const { subjectCode } = ctx.params

    const subjectData = await subjectQueries.getSubjectByCode(subjectCode)

    if (!subjectData) {
        return 'Subject not found.'
    }

    return null
}

export const doesSubjectExistByCodeAndAttach = async (ctx) => {
    const { subjectCode } = ctx.params

    const subjectData = await subjectQueries.getSubjectByCode(subjectCode)

    if (!subjectData) {
        return 'Subject not found.'
    }

    ctx.state.subject = subjectData
    return null
}

export const isSubjectCodeAlreadyAdded = async (ctx) => {
    const { subjectCode } = ctx.request.body

    const subjectData = await subjectQueries.getSubjectByCode(subjectCode)

    if (subjectData) {
        return 'Subject Code Already Added.'
    }

    ctx.state.subject = subjectData
    return null
}

export const isFieldsValid = async (ctx) => {
    const { body } = ctx.request
    const allowedFields = [
        'subjectCode',
        'name',
        'credit',
        'maximumMarks',
        'description',
    ]

    // limit number of fields
    if (Object.keys(body).length > allowedFields.length) {
        return 'Invalid Amount of Fields.'
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

export const isSubjectCodeValid = async (ctx) => {
    const { subjectCode } = ctx.request.body

    if (typeof subjectCode !== 'string' || !subjectCode.trim()) {
        return 'Subject Code should be a non-empty string.'
    }

    return null
}

export const isNameValid = async (ctx) => {
    const { name } = ctx.request.body

    if (typeof name !== 'string' || name.length < 5) {
        return 'Name should be a string with a minimum length of 5 characters.'
    }

    return null
}

export const isCreditValid = async (ctx) => {
    const { credit } = ctx.request.body

    if (typeof credit !== 'number' && credit < 0) {
        return 'Credit should be a Number.'
    }

    return null
}

export const isMaximumMarksValid = async (ctx) => {
    const { maximumMarks } = ctx.request.body

    if (typeof maximumMarks !== 'number' && maximumMarks < 0) {
        return 'Maximum Marks should be a Number.'
    }

    return null
}

export const isDescriptionValid = async (ctx) => {
    const { description } = ctx.request.body

    if (
        description &&
        (typeof description !== 'string' || description.length > 100)
    ) {
        return 'Description should be a string with a maximum length of 100 characters.'
    }

    return null
}

export const isSubjectCodeValidIfExists = async (ctx) => {
    const { subjectCode } = ctx.request.body

    if (
        subjectCode &&
        (typeof subjectCode !== 'string' || !subjectCode.trim())
    ) {
        return 'Subject Code should be a non-empty string.'
    }

    return null
}

export const isNameValidIfExists = async (ctx) => {
    const { name } = ctx.request.body

    if (name && (typeof name !== 'string' || name.length < 5)) {
        return 'Name should be a string with a minimum length of 5 characters.'
    }

    return null
}

export const isCreditValidIfExists = async (ctx) => {
    const { credit } = ctx.request.body

    if (credit && typeof credit !== 'number' && credit < 0) {
        return 'Credit should be a Number.'
    }

    return null
}

export const isMaximumMarksValidIfExists = async (ctx) => {
    const { maximumMarks } = ctx.request.body

    if (maximumMarks && typeof maximumMarks !== 'number' && maximumMarks < 0) {
        return 'Maximum Marks should be a number.'
    }

    return null
}

export const isDescriptionValidIfExists = async (ctx) => {
    const { description } = ctx.request.body

    if (
        description &&
        (typeof description !== 'string' || description.length > 100)
    ) {
        return 'Description should be a string with a maximum length of 100 characters.'
    }

    return null
}
