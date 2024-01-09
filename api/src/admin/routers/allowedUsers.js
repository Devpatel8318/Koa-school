import Router from '@koa/router'
import {
    addUser,
    getUser,
    getUsers,
    removeUser,
    loginAdmin,
} from '../controllers/allowedUsersController.js'
import { auth } from '../middleware/allowedUsersMiddleware.js'
import { doesUserExistByName } from '../validators/doesUserExistByName.js'

const router = new Router({ prefix: '/allowedusers' })

// login admin
router.post('/admin', loginAdmin)

// create new user
router.post('/', auth, addUser)

// get ALL users
router.get('/', auth, getUsers)

// get single user
router.get('/:name', auth, doesUserExistByName, getUser)

// delete
router.delete('/:name', doesUserExistByName, removeUser)

export default router
