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
    if (invalidFields.length > 0) {
        return 'Invalid field name'
    } else {
        return null
    }
}
