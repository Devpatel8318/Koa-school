import { validate as isValidUuid } from 'uuid'

const isIdValid = async (ctx) => {
    const { id } = ctx.params

    if (!isValidUuid(id)) {
        return 'Invalid Id'
    } else {
        return null
    }
}

export default isIdValid
