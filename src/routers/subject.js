import Router from '@koa/router'
import {
    createSubject,
    deleteSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
} from '../controllers/subjectControllers.js'

const router = new Router({ prefix: '/subjects' })

// get all subjects
router.get('/', getAllSubjects)

// get single subject
router.get('/:id', getSingleSubject)

// create subject
router.post('/', createSubject)

// update subject
router.patch('/:id', updateSubject)

// delete subject
router.delete('/:id', deleteSubject)

export default router
