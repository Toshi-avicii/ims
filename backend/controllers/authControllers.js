const userModel = require("../models/Users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const login =  async(req, res) => {
    const { email, password, role } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const user = await userModel.findOne({ email });
            if(user) {
                const result = await bcrypt.compare(password, user.password);
                if(result) {
                    const token = jwt.sign({id: user._id, name: user.name}, env.JWT_KEY, {expiresIn: '7days'});
                } else {
                    return res.status(401).json({errors: [{ "msg": 'password do not match' }]});
                }
            } else {
                return res.status(401).json({errors: [{"msg": `${email} is not found`}]});
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server Internal Error");
        }
    } else {
        res.status(401).json({ errors: errors.array() })
    }
};

module.exports = {
    login
}