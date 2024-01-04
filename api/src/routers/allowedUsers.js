import Router from '@koa/router'
import {
    addUser,
    getUser,
    getUsers,
    removeUser,
} from '../controllers/allowedUsersController.js'
import { doesUserExistByName } from '../middleware/allowedUsersMiddleware.js'

const router = new Router({ prefix: '/allowedusers' })

router.get('/', getUsers)
router.get('/:name', doesUserExistByName, getUser)
router.post('/', addUser)
router.delete('/:name', doesUserExistByName, removeUser)

export default router
