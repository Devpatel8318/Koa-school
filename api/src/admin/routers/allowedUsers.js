import Router from '@koa/router'
import {
    addUser,
    getUser,
    getUsers,
    removeUser,
    loginAdmin,
} from '../controllers/allowedUsersController.js'
import { auth } from '../middleware/allowedUsersMiddleware.js'
import { doesUserExistByName,isNameAlreadyAdded } from '../validators/doesUserExistByName.js'
import isPassKeyCorrect from '../validators/isPassKeyCorrect.js'

const router = new Router({ prefix: '/allowedusers' })

// login admin
router.post('/admin', isPassKeyCorrect, loginAdmin)

// create new user
router.post('/', auth, isNameAlreadyAdded, addUser)

// get ALL users
router.get('/', auth, getUsers)

// get single user
router.get('/:name', auth, doesUserExistByName, getUser)

// delete
router.delete('/:name', doesUserExistByName, removeUser)

export default router
