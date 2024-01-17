export const failureObject = (reason, message) => {
    const response = {}
    response.success = false
    response.reason = reason
    response.message = message || 'Something went wrong.'
    return response
}

export const successObject = (data, message) => {
    const response = {}
    response.success = true
    response.data = data
    response.message = message || 'data displayed successfully.'
    return response
}
