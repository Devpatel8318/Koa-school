import Router from '@koa/router'
import {
    createSubject,
    deleteSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
} from '../controllers/subjectControllers.js'
import { doesSubjectExistById } from '../middleware/subjectMiddlewares.js'

const router = new Router({ prefix: '/subjects' })

// get all subjects
router.get('/', getAllSubjects)

// get single subject
router.get('/:id', doesSubjectExistById, getSingleSubject)

// create subject
router.post('/', createSubject)

// update subject
router.patch('/:id', doesSubjectExistById, updateSubject)

// delete subject
router.delete('/:id', doesSubjectExistById, deleteSubject)

export default router
