import crypto from 'crypto'
const encryptPassword = (password) => {
    return crypto.createHash('md5').update(password).digest('hex')
}
export default encryptPassword
