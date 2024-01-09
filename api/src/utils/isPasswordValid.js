const isPasswordValid = (password) => {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/

    return passwordRegex.test(password)
}
export default isPasswordValid
