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
    doesStudentExistByEmail,
    doesStudentExistById,
} from '../validators/studentValidators.js'
import isIdValid from '../validators/validId.js'

const router = new Router({ prefix: '/students' })

// Get all students
router.get('/', getAllStudents)

// Get Single student
router.get('/:id', isIdValid, doesStudentExistById, getOneStudent)

// Create a new student
router.post('/', isLoginCredentialsValid, encryptPassword, createStudent)

// Student Login
router.post(
    '/login',
    isLoginCredentialsValid,
    encryptPassword,
    doesStudentExistByEmail,
    loginStudent
)

// Update a Student
router.patch('/:id', isIdValid, doesStudentExistById, updateStudent)

// Delete a student
router.delete('/:id', isIdValid, doesStudentExistById, deleteStudent)

export default router
