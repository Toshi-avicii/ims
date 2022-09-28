const { body } = require('express-validator');

const counselorValidations = [
    body('leadTitle').not().isEmpty().withMessage('Lead title is required'),
    body('leadEmail').isEmail().normalizeEmail().trim().escape().withMessage('Lead email is required'),
    body('name').not().isEmpty().trim().escape().withMessage('Lead name is required'),
    body('leadPhone').not().isEmpty().trim().escape().withMessage('Lead Phone no. is required'),
    body('leadDesc').not().isEmpty().trim().escape().withMessage('Lead Description is required'),
    body('counselor').not().isEmpty().trim().escape().withMessage('Counselor is required')
];

module.exports = {
    counselorValidations
}