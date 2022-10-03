const { body } = require('express-validator');

const counselorValidations = [
    body('name').not().isEmpty().withMessage('Counselor name is required'),
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required')
];

module.exports = {
    counselorValidations
}