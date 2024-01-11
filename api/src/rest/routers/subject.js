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
    isSubjectCodeValidIfExists,
    isNameValidIfExists,
    isCreditValidIfExists,
    isMaximumMarksValidIfExists,
    isDescriptionValidIfExists,
} from '../validators/subjectValidators.js'

const router = new Router({ prefix: '/subjects' })

// get all subjects
router.get('/', getAllSubjects)

// get one subject
router.get(
    '/:id',
    validator([doesSubjectExistByCodeAndAttach]),
    getSingleSubject
)

// create subject
router.post(
    '/',
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
router.patch(
    '/:id',
    validator([
        //TODO:
        doesSubjectExistByCode,
        isFieldsValid,
        isSubjectCodeValidIfExists,
        isNameValidIfExists,
        isCreditValidIfExists,
        isMaximumMarksValidIfExists,
        isDescriptionValidIfExists,
    ]),
    updateSubject
)

// delete subject
router.delete('/:id', validator([doesSubjectExistByCode]), deleteSubject)

export default router
