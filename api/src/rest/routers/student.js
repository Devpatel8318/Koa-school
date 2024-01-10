import Router from '@koa/router'

import { encryptPassword } from '../middleware/encryptPassword.js'
import validator from '../middleware/validator.js'

import {
    isLoginCredentialsValid,
    isPasswordCorrect,
    doesStudentExistByEmail,
    doesStudentExistById,
    isFieldsValid,
    isEmailAvailable,
} from '../validators/studentValidators.js'
import isIdValid from '../validators/validId.js'

import {
    deleteStudent,
    getOneStudent,
    getAllStudents,
    loginStudent,
    updateStudent,
    createStudent,
} from '../controllers/studentControllers.js'

export const router = new Router({ prefix: '/students' })

// Get all students
router.get('/', getAllStudents)

// Get Single student
router.get('/:id', validator([isIdValid, doesStudentExistById]), getOneStudent)

// Student Login
router.post(
    '/login',
    validator([
        isLoginCredentialsValid,
        doesStudentExistByEmail,
        isPasswordCorrect,
    ]),
    loginStudent
)

// Create a new student
router.post(
    '/',
    validator([isFieldsValid, isLoginCredentialsValid, isEmailAvailable]),
    encryptPassword,
    createStudent
)

// Update a Student
router.patch(
    '/:id',
    validator([isFieldsValid, isIdValid, doesStudentExistById]),
    updateStudent
)

// Delete a student
router.delete(
    '/:id',
    validator([isIdValid, doesStudentExistById]),
    deleteStudent
)

export default router
