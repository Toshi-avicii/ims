const userModel = require('../models/Users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const getCounselors = async(req, res) => {
    const result = await userModel.find({role: "counselor"});
    if(result.length > 0) {
        res.status(200).json({
            counselors: result
        })
    } else {
        return res.status(401).json({msg: "no counselors found."});
    }
};

const  addCounselor = async(req, res) => {
    const { email, password, name} = req.body;
    const errors = validationResult(req);

    if(errors.isEmpty()) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const result = await userModel.create({
                username: name,
                email,
                password: hashedPassword,
                role: 'counselor'
            });
    
            if(result) {
                res.status(201).json({
                    msg: 'counselor created successfully',
                    counselorDetails: result
                });
            } else {
                res.status(401).json({
                    msg: 'Could not create counselor'
                });
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server Internal Error");
        }
    } else {
        res.status(401).json({ errors: errors.array() })
    }
}

const deleteCounselors = async(req, res) => {
    try {
        const deletedUsers = await userModel.deleteMany({ role: 'counselor' });
        if(deletedUsers) {
            res.status(200).json({
                msg: 'users deleted successfully',
                data: deletedUsers
            })
        } else {
            res.status(401).json({
                msg: 'No users found'
            })
        }

    } catch(err) {
        res.status(500).json({
            msg: err.message
        });
    }
}

module.exports = {
    getCounselors,
    addCounselor,
    deleteCounselors
}