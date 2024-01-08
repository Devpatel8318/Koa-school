import crypto from 'crypto'
export const passwordEncryption = (password) => {
    const pattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/
    if (!pattern.test(password)) return false
    return crypto.createHash('md5').update(password).digest('hex')
}
