import Router from '@koa/router'

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
} from '../validators/studentValidators.js'

import {
    deleteStudent,
    getOneStudent,
    getAllStudents,
    loginStudent,
    updateStudent,
    createStudent,
} from '../controllers/studentControllers.js'

export const router = new Router({ prefix: '/student' })

// Get all students
router.get('/list', getAllStudents)

// Get Single student
router.get(
    '/view/:studentId',
    validator([doesStudentExistByIdAndAttach]),
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
    '/add',
    validator([
        isFieldsValid,
        isEmailValid,
        isEmailAvailable,
        isFirstNameValid,
        isLastNameValid,
        isPasswordValid,
    ]),
    createStudent
)

// Update a Student
router.put(
    '/edit/:studentId',
    validator([
        isFieldsValid,
        doesStudentExistById,
        isEmailValid,
        isFirstNameValid,
        isLastNameValid,
        isPasswordValid,
    ]),
    updateStudent
)

// Delete a student
router.delete(
    '/delete/:studentId',
    validator([doesStudentExistByIdAndAttach]),
    deleteStudent
)

export default router
