export const failureObject = (message) => {
    const response = {}
    response.success = false
    response.reason = message
    response.message = 'Something went wrong'
    return response
}

export const successObject = (data) => {
    const response = {}
    response.success = true
    response.data = data
    response.message = 'data displayed successfully.'// dynamically
    return response
}
