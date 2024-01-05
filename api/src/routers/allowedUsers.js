import Router from '@koa/router'
import {
    addUser,
    getUser,
    getUsers,
    removeUser,
    loginAdmin,
} from '../controllers/allowedUsersController.js'
import {
    auth,
    doesUserExistByName,
} from '../middleware/allowedUsersMiddleware.js'

const router = new Router({ prefix: '/allowedusers' })

router.post('/admin', loginAdmin)
router.get('/', auth, getUsers)
router.get('/:name', auth, doesUserExistByName, getUser)
router.post('/', auth, addUser)
router.delete('/:name', auth, doesUserExistByName, removeUser)

export default router
