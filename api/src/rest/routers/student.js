import Router from '@koa/router'

import { encryptPassword } from '../middleware/encryptPassword.js'
import validator from '../middleware/validator.js'

import {
    isPasswordCorrect,
    doesStudentExistByEmail,
    doesStudentExistById,
    doesStudentExistByIdAndAttach,
    isFieldsValid,
    isEmailAvailable,
    isFirstNameValid,
    isLastNameValid,
    isEmailValid,
    isPasswordValid,
    isFirstNameValidIfExists,
    isLastNameValidIfExists,
    isEmailValidIfExists,
    isPasswordValidIfExists,
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
router.get(
    '/:id',
    validator([isIdValid, doesStudentExistByIdAndAttach]),
    getOneStudent
)

// Student Login
router.post(
    '/login',
    validator([
        isFieldsValid,
        isEmailValid,
        isPasswordValid,
        doesStudentExistByEmail,
        isPasswordCorrect,
    ]),
    loginStudent
)

// Create a new student
router.post(
    '/',
    validator([
        isFieldsValid,
        isEmailValid,
        isEmailAvailable,
        isFirstNameValid,
        isLastNameValid,
        isPasswordValid,
    ]),
    encryptPassword,
    createStudent
)

// Update a Student
router.patch(
    '/:id',
    validator([
        isFieldsValid,
        isIdValid,
        //TODO:
        doesStudentExistById,
        isFirstNameValidIfExists,
        isLastNameValidIfExists,
        isEmailValidIfExists,
        isPasswordValidIfExists,
    ]),
    updateStudent
)

// Delete a student
router.delete(
    '/:id',
    validator([isIdValid, doesStudentExistByIdAndAttach]),
    deleteStudent
)

export default router
