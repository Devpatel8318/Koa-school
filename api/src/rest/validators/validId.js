import { validate as isValidUuid } from 'uuid'

const isIdValid = async (ctx) => {
    const { id } = ctx.params

    if (!isValidUuid(id)) {
        return 'Invalid Id'
    }
    return null
}

export default isIdValid
