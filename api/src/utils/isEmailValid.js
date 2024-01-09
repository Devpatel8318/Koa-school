const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const maxLength = 254

    return email.length <= maxLength && emailRegex.test(email)
}

export default isEmailValid