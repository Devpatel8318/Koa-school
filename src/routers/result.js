import Router from '@koa/router'
import validId from '../middleware/validId.js'
import {
    createResult,
    getFormattedResultByStudent,
    getResults,
    getSingleFormattedResult,
    getSingleResult,
} from '../controllers/resultController.js'

const router = new Router({ prefix: '/results' })

router.get('/', getResults)

router.get('/:id', validId, getSingleResult)

router.get('/formatted/:id', validId, getSingleFormattedResult)

router.get('/formatted/students/:id', getFormattedResultByStudent)

router.post('/', createResult)

router.patch('/:id', validId)

router.delete('/:id', validId)

export default router
