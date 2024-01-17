const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailPatternValid = (email) => {
    if (!emailPattern.test(email)) {
        return false
    }
    return true
}
export default isEmailPatternValid
