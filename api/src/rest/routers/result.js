import Router from '@koa/router'

import validator from '../middleware/validator.js'

import { doesStudentExistById } from '../validators/studentValidators.js'
import {
    doesResultExistById,
    isStudentvalid,
    doesStudentAlreadyHaveResult,
    isFieldsValid,
    isStudentIdFieldValid,
    isSignedByValid,
    areMarksValid,
    isStudentIdFieldValidIfExists,
    isSignedByValidIfExists,
    areMarksValidIfExists,
} from '../validators/resultValidators.js'
import isIdValid from '../validators/validId.js'

import {
    createResult,
    deleteResult,
    getFormattedResultByStudent,
    getAllResults,
    getSingleFormattedResult,
    getSingleResult,
    updateResult,
} from '../controllers/resultController.js'

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
        isSignedByValid,
        areMarksValid,
        //TODO:
        isStudentIdFieldValid,
        doesStudentAlreadyHaveResult,
    ]),
    createResult
)

router.patch(
    '/:id',
    validator([
        isFieldsValid,
        isIdValid,
        doesResultExistById,
        isStudentIdFieldValidIfExists,
        isSignedByValidIfExists,
        areMarksValidIfExists,
    ]),
    updateResult
)

router.delete('/:id', validator([isIdValid, doesResultExistById]), deleteResult)

export default router
