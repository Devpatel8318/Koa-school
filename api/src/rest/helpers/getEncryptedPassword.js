import crypto from 'crypto'
const encryptedPassword = (password) => {
    return crypto.createHash('md5').update(password).digest('hex')
}
export default encryptedPassword
