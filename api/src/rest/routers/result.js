import Router from '@koa/router'

import validator from '../middleware/validator.js'

import { doesStudentExistByIdAndAttach } from '../validators/studentValidators.js'
import {
    doesResultExistById,
    doesResultExistByIdAndAttach,
    isStudentvalid,
    doesStudentAlreadyHaveResult,
    isFieldsValid,
    isStudentIdFieldValid,
    isSignedByValid,
    areMarksValid,
    doesSubjectExist,
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

const router = new Router({ prefix: '/result' })

router.get('/all', getAllResults)

router.get(
    '/:id',
    validator([isIdValid, doesResultExistByIdAndAttach]),
    getSingleResult
)

router.get(
    '/formatted/:id',
    validator([isIdValid, doesResultExistByIdAndAttach]),
    getSingleFormattedResult
)

router.get(
    '/formatted/students/:id',
    validator([isIdValid, doesStudentExistByIdAndAttach, isStudentvalid]),
    getFormattedResultByStudent
)

router.post(
    '/add',
    validator([
        isFieldsValid,
        isSignedByValid,
        areMarksValid,
        doesSubjectExist,
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

router.delete(
    '/:id',
    validator([isIdValid, doesResultExistByIdAndAttach]),
    deleteResult
)

export default router
