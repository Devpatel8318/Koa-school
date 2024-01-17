import Router from '@koa/router'

import validator from '../middleware/validator.js'

import { doesStudentExistByIdAndAttach } from '../validators/studentValidators.js'
import {
    doesResultExistById,
    doesResultExistByIdAndAttach,
    doesStudentHaveResult,
    doesStudentAlreadyHaveResult,
    isFieldsValid,
    isStudentIdFieldValid,
    isSignedByValid,
    isMarksArrayValid,
    areSubjectCodesValid,
    isMarksGreaterThanMaximumMarks,
    isStudentIdChanged,
} from '../validators/resultValidators.js'

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

router.get('/list', getAllResults)

router.get(
    '/view/:resultId',
    validator([doesResultExistByIdAndAttach]),
    getSingleResult
)

router.get(
    '/formatted/:resultId',
    validator([doesResultExistByIdAndAttach]),
    getSingleFormattedResult
)

router.get(
    '/formatted/students/:resultId',
    validator([doesStudentExistByIdAndAttach, doesStudentHaveResult]),
    getFormattedResultByStudent
)

router.post(
    '/add',
    validator([
        isFieldsValid,
        isStudentIdFieldValid,
        doesStudentAlreadyHaveResult,
        isSignedByValid,
        isMarksArrayValid,
        areSubjectCodesValid,
        isMarksGreaterThanMaximumMarks,
    ]),
    createResult
)

router.put(
    '/edit/:resultId',
    validator([
        isFieldsValid,
        doesResultExistById,
        isStudentIdFieldValid,
        isStudentIdChanged,
        isSignedByValid,
        isMarksArrayValid,
        areSubjectCodesValid,
        isMarksGreaterThanMaximumMarks,
    ]),
    updateResult
)

router.delete(
    '/delete/:resultId',
    validator([doesResultExistByIdAndAttach]),
    deleteResult
)

export default router
