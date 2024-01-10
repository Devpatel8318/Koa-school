import Router from '@koa/router'
import {
    createSubject,
    deleteSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
} from '../controllers/subjectControllers.js'
import {
    doesSubjectExistByCode,
    isSubjectCodeAlreadyAdded,
} from '../validators/subjectValidators.js'

const router = new Router({ prefix: '/subjects' })

// get all subjects
router.get('/', getAllSubjects)

// get one subject
router.get('/:id', doesSubjectExistByCode, getSingleSubject)

// create subject
router.post('/', isSubjectCodeAlreadyAdded, createSubject)

// update subject
router.patch('/:id', doesSubjectExistByCode, updateSubject)

// delete subject
router.delete('/:id', doesSubjectExistByCode, deleteSubject)

//TODO:
// router.delete('/:id',validator([v1,v2,v3,v4,v5,v6,v7]) doesSubjectExistById, deleteSubject)

export default router
