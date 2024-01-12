import Router from '@koa/router'

import auth from '../middleware/auth.js'

import validator from '../middleware/validator.js'
import {
    doesUserExistByName,
    doesUserExistByNameAndAttach,
    isNameAlreadyAdded,
    isPassKeyCorrect,
    isFieldValid,
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
router.get('/list', auth, getUsers)

// get single user
router.get(
    '/view/:name',
    auth,
    validator([doesUserExistByNameAndAttach]),
    getUser
)

// create new user
router.post(
    '/add',
    auth,
    validator([isFieldValid, isNameValid, isNameAlreadyAdded]),
    addUser
)

// delete
router.delete(
    '/delete/:name',
    auth,
    validator([doesUserExistByName]),
    removeUser
)

export default router
