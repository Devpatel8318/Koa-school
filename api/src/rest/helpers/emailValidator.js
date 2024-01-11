const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailValidator = (email) => {
    if (
        typeof email !== 'string' ||
        emailPattern.length > 254 ||
        !emailPattern.test(email)
    ) {
        return false
    }
    return true
}
export default emailValidator
