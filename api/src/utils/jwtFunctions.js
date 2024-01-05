import jwt from 'jsonwebtoken'

export const generateAuthToken = () => {
    const token = jwt.sign(
        { message: 'Authenticated' },
        process.env.JWT_SECRET,
        {
            expiresIn: '60m',
        }
    )
    return token
}

export const isTokenValid = function (token) {
    try {
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET)
        return true
    } catch (err) {
        return false
    }
}
