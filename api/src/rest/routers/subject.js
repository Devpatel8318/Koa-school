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
    isFieldsValid,
    isSubjectCodeAlreadyAdded,
} from '../validators/subjectValidators.js'

const router = new Router({ prefix: '/subjects' })

// get all subjects
router.get('/', getAllSubjects)

// get one subject
router.get('/:id', validator([doesSubjectExistByCode]), getSingleSubject)

// create subject
router.post(
    '/',
    validator([isFieldsValid, isSubjectCodeAlreadyAdded]),
    createSubject
)

// update subject
router.patch(
    '/:id',
    validator([isFieldsValid, doesSubjectExistByCode]),
    updateSubject
)

// delete subject
router.delete('/:id', validator([doesSubjectExistByCode]), deleteSubject)

export default router
