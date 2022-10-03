const { body } = require('express-validator');

const loginValidations = [
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
    body('role').not().isEmpty().withMessage('Role is required')
];

module.exports = {
    loginValidations
}