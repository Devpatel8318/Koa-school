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

import validator from '../middleware/validator.js'
import { doesStudentExistById } from '../validators/studentValidators.js'
import {
    doesResultExistById,
    isStudentvalid,
    doesStudentAlreadyHaveResult,
    isFieldsValid,
    isStudentIdFieldValid,
} from '../validators/resultValidators.js'
import isIdValid from '../validators/validId.js'

const router = new Router({ prefix: '/results' })

router.get('/', getAllResults)

router.get('/:id', validator([isIdValid, doesResultExistById]), getSingleResult)

router.get(
    '/formatted/:id',
    validator([isIdValid, doesResultExistById]),
    getSingleFormattedResult
)

router.get(
    '/formatted/students/:id',
    validator([isIdValid, doesStudentExistById, isStudentvalid]),
    getFormattedResultByStudent
)

router.post(
    '/',
    validator([
        isFieldsValid,
        isStudentIdFieldValid,
        doesStudentAlreadyHaveResult,
    ]),
    createResult
)

router.patch(
    '/:id',
    validator([isFieldsValid, isIdValid, doesResultExistById]),
    updateResult
)

router.delete('/:id', validator([isIdValid, doesResultExistById]), deleteResult)

export default router
