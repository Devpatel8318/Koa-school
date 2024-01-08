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

router.post('/admin', loginAdmin)
router.get('/', auth, getUsers)
router.get('/:name', auth, doesUserExistByName, getUser)
router.post('/', auth, addUser)
router.delete('/:name', auth, doesUserExistByName, removeUser)

export default router

// code optimzed
// body1 done done
// middleware auth done
// validators done
// helpers done


// rest done
// admin done
