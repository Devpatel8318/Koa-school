import jwt from 'jsonwebtoken'

export const generateAuthToken = () => {
    return jwt.sign({ message: 'Authenticated' }, process.env.JWT_SECRET, {
        expiresIn: '60m',
    })
}

export const isTokenValid = function (token) {
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return true
    } catch (err) {
        return false
    }
}
