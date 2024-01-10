import Router from '@koa/router'

import {
    createStudent,
    deleteStudent,
    getOneStudent,
    getAllStudents,
    loginStudent,
    updateStudent,
} from '../controllers/studentControllers.js'

import { encryptPassword } from '../middleware/encryptPassword.js'

import {
    isLoginCredentialsValid,
    isPasswordCorrect,
    doesStudentExistByEmail,
    doesStudentExistById,
    isEmailAvailable,
} from '../validators/studentValidators.js'
import isIdValid from '../validators/validId.js'

const router = new Router({ prefix: '/students' })

// Get all students
router.get('/', getAllStudents)

// Get Single student
router.get('/:id', isIdValid, doesStudentExistById, getOneStudent)

// Create a new student
router.post(
    '/',
    isLoginCredentialsValid,
    encryptPassword,
    isEmailAvailable,
    createStudent
)

// Student Login
router.post(
    '/login',
    isLoginCredentialsValid,
    doesStudentExistByEmail,
    encryptPassword,
    isPasswordCorrect,
    loginStudent
)

// Update a Student
router.patch('/:id', isIdValid, doesStudentExistById, updateStudent)

// Delete a student
router.delete('/:id', isIdValid, doesStudentExistById, deleteStudent)

export default router
