import Router from '@koa/router'

import auth from '../middleware/auth.js'

import validator from '../middleware/validator.js'
import {
    doesUserExistByName,
    doesUserExistByNameAndAttach,
    isNameAlreadyAdded,
    isPassKeyPresent,
    isPassKeyCorrect,
    isCreateFieldsValid,
    isLoginFieldsValid,
    isNameValid,
} from '../validators/allowedUsersValidators.js'

import {
    addUser,
    getUser,
    getUsers,
    removeUser,
    loginAdmin,
    getData,
} from '../controllers/allowedUsersController.js'

const router = new Router({ prefix: '/alloweduser' })

// login admin
router.post(
    '/admin',
    validator([isLoginFieldsValid, isPassKeyPresent, isPassKeyCorrect]),
    loginAdmin
)

// get users
router.get('/view', auth, validator([doesUserExistByNameAndAttach]), getData)

//create
router.post(
    '/add',
    auth,
    validator([isCreateFieldsValid, isNameValid, isNameAlreadyAdded]),
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
