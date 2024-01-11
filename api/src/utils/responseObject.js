export const failureObject = (reason, message, status) => {
    const response = {}
    response.success = false
    response.reason = reason
    response.message = message || 'Something went wrong.'
    return response
}

export const successObject = (data) => {
    const response = {}
    response.success = true
    response.data = data
    response.message = 'data displayed successfully.'
    return response
}
