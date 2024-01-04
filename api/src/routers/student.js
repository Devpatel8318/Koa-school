import Router from '@koa/router'
import validId from '../middleware/validId.js'
import {
    validLoginCredentials,
    doesStudentExistByEmail,
    doesStudentExistById,
    validateAndEncryptPassword,
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
router.post(
    '/login',
    validLoginCredentials,
    doesStudentExistByEmail,
    validateAndEncryptPassword,
    loginStudent
)

// Create a new student
router.post('/',validateAndEncryptPassword,createStudent)

// Update a Student
router.patch('/:id', validId, doesStudentExistById, updateStudent)

// Delete a student
router.delete('/:id', validId, doesStudentExistById, deleteStudent)

export default router
