const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/

const isPasswordPatternValid = (password) => {
    if (!passwordRegex.test(password)) {
        return false
    }
    return true
}
export default isPasswordPatternValid
