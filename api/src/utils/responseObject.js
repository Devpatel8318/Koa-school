export const failureObject = (reason, message) => {
    const response = {}
    response.success = false
    response.reason = reason
    response.message = message || 'Something went wrong.'
    return response
}

export const successObject = (message = '', data = {}) => {
    const response = {}

    response.success = true
    if (Object.keys(data).length) {
        response.data = data
    }
    response.message = message || 'data displayed successfully.'

    return response
}
