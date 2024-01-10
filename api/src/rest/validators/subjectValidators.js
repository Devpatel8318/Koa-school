import * as subjectQueries from '../queries/subjectQueries.js'

export const doesSubjectExistByCode = async (ctx) => {
    try {
        const { id } = ctx.params

        const subjectDoc = await subjectQueries.getSubjectByCode(id)

        if (!subjectDoc) {
            throw new Error('Subject not found')
        } else {
            ctx.state.subject = subjectDoc
            return null
        }
    } catch (err) {
        return err.message
    }
}

export const isSubjectCodeAlreadyAdded = async (ctx) => {
    try {
        const { subjectCode } = ctx.request.body

        const subjectDoc = await subjectQueries.getSubjectByCode(subjectCode)

        if (subjectDoc) {
            throw new Error('Subject Code Already Added')
        } else {
            ctx.state.subject = subjectDoc
            return null
        }
    } catch (err) {
        return err.message
    }
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
        return 'Invalid amount of fields'
    }

    //check for invalid fields
    const invalidFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field)
    )
    if (invalidFields.length) {
        return 'Invalid field name'
    } else {
        return null
    }
}

export const isSubjectCodeValid = async (ctx) => {
    const { subjectCode } = ctx.request.body

    if (typeof subjectCode !== 'string' || !subjectCode.trim()) {
        return 'Subject Code should be a non-empty string'
    } else {
        return null
    }
}

export const isNameValid = async (ctx) => {
    const { name } = ctx.request.body

    if (typeof name !== 'string' || name.length < 5) {
        return 'Name should be a string with a minimum length of 5 characters'
    } else {
        return null
    }
}

export const isCreditValid = async (ctx) => {
    const { credit } = ctx.request.body

    if (typeof credit !== 'number') {
        return 'Credit should be a number'
    } else {
        return null
    }
}

export const isMaximumMarksValid = async (ctx) => {
    const { maximumMarks } = ctx.request.body

    if (typeof maximumMarks !== 'number') {
        return 'Maximum Marks should be a number'
    } else {
        return null
    }
}

export const isDescriptionValid = async (ctx) => {
    const { description } = ctx.request.body

    if (
        description &&
        (typeof description !== 'string' || description.length > 100)
    ) {
        return 'Description should be a string with a maximum length of 100 characters'
    }
    return null
}

export const isSubjectCodeValidIfExists = async (ctx) => {
    const { subjectCode } = ctx.request.body

    if (
        subjectCode &&
        (typeof subjectCode !== 'string' || !subjectCode.trim())
    ) {
        return 'Subject Code should be a non-empty string'
    }
    return null
}

export const isNameValidIfExists = async (ctx) => {
    const { name } = ctx.request.body

    if (name && (typeof name !== 'string' || name.length < 5)) {
        return 'Name should be a string with a minimum length of 5 characters'
    }
    return null
}

export const isCreditValidIfExists = async (ctx) => {
    const { credit } = ctx.request.body

    if (credit && typeof credit !== 'number') {
        return 'Credit should be a number'
    }
    return null
}

export const isMaximumMarksValidIfExists = async (ctx) => {
    const { maximumMarks } = ctx.request.body

    if (maximumMarks && typeof maximumMarks !== 'number') {
        return 'Maximum Marks should be a number'
    }
    return null
}

export const isDescriptionValidIfExists = async (ctx) => {
    const { description } = ctx.request.body

    if (
        description &&
        (typeof description !== 'string' || description.length > 100)
    ) {
        return 'Description should be a string with a maximum length of 100 characters'
    }
    return null
}
