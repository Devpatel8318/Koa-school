import Router from '@koa/router'
import {
    addUser,
    getUser,
    getUsers,
    removeUser,
    loginAdmin,
} from '../controllers/allowedUsersController.js'

import { auth } from '../middleware/allowedUsersMiddleware.js'

import validator from '../middleware/validator.js'
import {
    doesUserExistByName,
    isNameAlreadyAdded,
    isPassKeyCorrect,
    isFieldsValid,
} from '../validators/allowedUsersValidators.js'

const router = new Router({ prefix: '/allowedusers' })

// login admin
router.post('/admin', validator([isPassKeyCorrect]), loginAdmin)

// get ALL users
router.get('/', validator([auth]), getUsers)

// get single user
router.get('/:name', validator([auth, doesUserExistByName]), getUser)

// create new user
router.post('/', validator([auth, isFieldsValid, isNameAlreadyAdded]), addUser)

// delete
router.delete('/:name', validator([auth, doesUserExistByName]), removeUser)

export default router
