import { validate as isValidUuid } from 'uuid'

const isIdValid = async (ctx) => {
    const { id } = ctx.params

    if (!isValidUuid(id)) {
        return 'Invalid UUID'
    } else {
        return null
    }
}

export default isIdValid
