const userModel = require("../models/Users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const env = require('../config/envConfig');

const login =  async(req, res) => {
    const { email, password, role } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const user = await userModel.findOne({ email, role });
            if(user) {
                const result = await bcrypt.compare(password, user.password);
                if(result) {
                    const token = jwt.sign({ id: user._id, name: user.name, role }, env.JWT_KEY, { expiresIn: '7days' });

                    res.status(200).json({
                        msg: 'Login Successful',
                        data: user,
                        token
                    })
                } else {
                    return res.status(401).json({errors: [{ "msg": 'password do not match' }]});
                }
            } else {
                return res.status(401).json({errors: [{"msg": `Email is not found or not a admin`}]});
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server Internal Error");
        }
    } else {
        res.status(401).json({ errors: errors.array() })
    }
};

const getLoginUser = async(req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.userId });
        if(user) {
            res.status(200).json({
                msg: "Data generated successfully",
                data: user,
            });
        } else {
            res.status(401).json({
                msg: "No Users found"
            })
        }
    } catch(err) {
        res.status(401).json({
            msg: err.message
        })
    }
}

const updateUser = async(req, res) => {
    let result;
    const { name, email, photo } = req.body; 
    // password is needed to update the data, this route won't update the password.
    
    try {
      
      const authHeader = req.headers['authorization'];
  
      // split the user information from the token
      const token = authHeader && authHeader.split(' ')[1];
  
      // check if the token is null or if the request header is set or not
      if(token === null || !token) return res.status(401).json({ msg: 'User not authorized' });
  
      const tokenPayload = jwt.verify(token, env.JWT_KEY, (err, payload) => {
        return payload;
      });
  
      const foundedAdmin = await userModel.findOne({ _id: tokenPayload.id });
    //   const correctPassword = await bcrypt.compare(password, foundedAdmin.password);
  
      if(name && foundedAdmin) {
        result = await userModel.findOneAndUpdate(
          { _id: tokenPayload.id },
          { name },
          { new: true }
        )
    }
  
      if(email && foundedAdmin) {
        result = await userModel.findOneAndUpdate(
          { _id: tokenPayload.id },
          { email },
          { new: true }
        )
    }

      if(photo && foundedAdmin) {
        result = await userModel.findOneAndUpdate(
          { _id: tokenPayload.id },
            { photo },
            { new: true }
        )
    }
    
      if(result) {  
        res.status(200).json({
          msg: "User details updated successfully.",
          data: result,
        });
      } else {
        throw new Error('Server Error');
      }
    } catch(err) {
      res.status(401).json({
        msg: err.message,
      });
    }
  };

module.exports = {
    login,
    getLoginUser,
    updateUser
}