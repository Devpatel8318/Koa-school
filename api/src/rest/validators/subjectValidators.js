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

    if (!subjectCode) {
        return 'Please Provide Subject Code.'
    }

    if (typeof subjectCode !== 'string') {
        return 'Subject Code must be a string.'
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

    if (name.length < 5) {
        return 'Name must be more than 5 characters.'
    }

    return null
}

export const isCreditValid = async (ctx) => {
    const { credit } = ctx.request.body

    if (!credit) {
        return 'Please Provide Credit.'
    }

    if (typeof credit !== 'number') {
        return 'Credit must be a Number.'
    }

    if (credit < 0) {
        return 'Credit must be positive Number.'
    }

    return null
}

export const isMaximumMarksValid = async (ctx) => {
    const { maximumMarks } = ctx.request.body

    if (!maximumMarks) {
        return 'Please Provide Maximum Marks.'
    }

    if (typeof maximumMarks !== 'number') {
        return 'Maximum Marks must be a Number.'
    }

    if (maximumMarks < 0) {
        return 'Maximum Marks must be positive Number.'
    }

    return null
}

export const isDescriptionValid = async (ctx) => {
    const { description } = ctx.request.body

    if (!description) {
        return 'Please Provide Description'
    }

    if (typeof description !== 'string') {
        return 'Description must be a string'
    }

    if (description.length > 100) {
        return 'description must be less than 100 characters.'
    }

    return null
}
