import Router from '@koa/router'

import auth from '../middleware/allowedUsersMiddleware.js'

import validator from '../middleware/validator.js'
import {
    doesUserExistByName,
    doesUserExistByNameAndAttach,
    isNameAlreadyAdded,
    isPassKeyCorrect,
    isFieldsValid,
    isNameValid,
} from '../validators/allowedUsersValidators.js'

import {
    addUser,
    getUser,
    getUsers,
    removeUser,
    loginAdmin,
} from '../controllers/allowedUsersController.js'

const router = new Router({ prefix: '/alloweduser' })

// login admin
router.post('/admin', validator([isPassKeyCorrect]), loginAdmin)

// get ALL users
router.get('/all', validator([auth]), getUsers)

// get single user
router.get('/:name', validator([auth, doesUserExistByNameAndAttach]), getUser)

// create new user
router.post(
    '/add',
    validator([auth, isFieldsValid, isNameValid, isNameAlreadyAdded]),
    addUser
)

// delete
router.delete('/:name', validator([auth, doesUserExistByName]), removeUser)

export default router
