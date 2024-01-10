import Router from '@koa/router'
import {
    createResult,
    deleteResult,
    getFormattedResultByStudent,
    getAllResults,
    getSingleFormattedResult,
    getSingleResult,
    updateResult,
} from '../controllers/resultController.js'

import { doesStudentExistById } from '../validators/studentValidators.js'
import {
    doesResultExistById,
    isStudentvalid,
    doesStudentAlreadyHaveResult,
} from '../validators/resultValidators.js'
import isIdValid from '../validators/validId.js'

const router = new Router({ prefix: '/results' })

router.get('/', getAllResults)

router.get('/:id', isIdValid, doesResultExistById, getSingleResult)

router.get(
    '/formatted/:id',
    isIdValid,
    doesResultExistById,
    getSingleFormattedResult
)

router.get(
    '/formatted/students/:id',
    isIdValid,
    doesStudentExistById,
    isStudentvalid,
    getFormattedResultByStudent
)

router.post('/', doesStudentAlreadyHaveResult, createResult)

router.patch('/:id', isIdValid, doesResultExistById, updateResult)

router.delete('/:id', isIdValid, doesResultExistById, deleteResult)

export default router
