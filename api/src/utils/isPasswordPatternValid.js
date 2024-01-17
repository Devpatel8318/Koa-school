const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/

const isPasswordPatternValid = (password) => {
    if (
        typeof password !== 'string' ||
        password.length < 6 ||
        !passwordRegex.test(password)
    ) {
        return false
    }
    return true
}
export default isPasswordPatternValid
