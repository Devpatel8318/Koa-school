import Router from '@koa/router'
import validId from '../middleware/validId.js'
import {
    validLoginCredentials,
    doesStudentExistByEmail,
    doesStudentExistById,
} from '../middleware/studentMiddlewares.js'
import {
    createStudent,
    deleteStudent,
    getSingleStudent,
    getStudents,
    loginStudent,
    updateStudent,
} from '../controllers/studentControllers.js'

const router = new Router({ prefix: '/students' })

// Get all students
router.get('/', getStudents)

// Get Single student

router.get('/:id', validId, doesStudentExistById, getSingleStudent)

// Student Login
router.post('/login', validLoginCredentials, doesStudentExistByEmail, loginStudent)

// Create a new student
router.post('/', createStudent)

// Update a Student
router.patch('/:id', validId, updateStudent)

// Delete a student
router.delete('/:id', validId, deleteStudent)

export default router
