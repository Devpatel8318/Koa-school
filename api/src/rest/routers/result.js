import Router from '@koa/router'
import validId from '../middleware/validId.js'
import {
    createResult,
    deleteResult,
    getFormattedResultByStudent,
    getResults,
    getSingleFormattedResult,
    getSingleResult,
    updateResult,
} from '../controllers/resultController.js'
import { doesStudentExistById } from '../validators/studentValidators.js'
import {
    doesResultExistById,
    validStudent,
} from '../validators/resultValidators.js'

const router = new Router({ prefix: '/results' })

router.get('/', getResults)

router.get('/:id', validId, doesResultExistById, getSingleResult)

router.get(
    '/formatted/:id',
    validId,
    doesResultExistById,
    getSingleFormattedResult
)

router.get(
    '/formatted/students/:id',
    validId,
    doesStudentExistById,
    validStudent,
    getFormattedResultByStudent
)

router.post('/', createResult)

router.patch('/:id', validId, doesResultExistById, updateResult)

router.delete('/:id', validId, doesResultExistById, deleteResult)

export default router
