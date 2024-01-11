import Router from '@koa/router'

import {
    createSubject,
    deleteSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
} from '../controllers/subjectControllers.js'

import validator from '../middleware/validator.js'
import {
    doesSubjectExistByCode,
    doesSubjectExistByCodeAndAttach,
    isFieldsValid,
    isSubjectCodeAlreadyAdded,
    isCreditValid,
    isDescriptionValid,
    isMaximumMarksValid,
    isNameValid,
    isSubjectCodeValid,
} from '../validators/subjectValidators.js'

const router = new Router({ prefix: '/subject' })

// get all subjects
router.get('/list', getAllSubjects)

// get one subject
router.get(
    '/one/:subjectCode',
    validator([doesSubjectExistByCodeAndAttach]),
    getSingleSubject
)

// create subject
router.post(
    '/add',
    validator([
        isFieldsValid,
        isSubjectCodeValid,
        isSubjectCodeAlreadyAdded,
        isNameValid,
        isCreditValid,
        isMaximumMarksValid,
        isDescriptionValid,
    ]),
    createSubject
)

// update subject
router.put(
    '/edit/:subjectCode',
    validator([
        doesSubjectExistByCode,
        isFieldsValid,
        isNameValid,
        isCreditValid,
        isMaximumMarksValid,
        isDescriptionValid,
    ]),
    updateSubject
)

// delete subject
router.delete(
    '/delete/:subjectCode',
    validator([doesSubjectExistByCode]),
    deleteSubject
)

export default router
