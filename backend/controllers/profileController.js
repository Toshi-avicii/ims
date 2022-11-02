const userModel = require("../models/Users");
const jwt = require('jsonwebtoken');
const env = require('../config/envConfig');


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
  try {
    let result;
    // password is needed to update the data, this route won't update the password.
      const { id, name, email, photo } = req.body; 
      console.log(req.body);
  
      const foundedAdmin = await userModel.findOne({ _id: id });
    //   const correctPassword = await bcrypt.compare(password, foundedAdmin.password);
  
      if(name && foundedAdmin) {
        result = await userModel.findOneAndUpdate(
          { _id: id },
          { name },
          { new: true }
        )
    }
  
      if(email && foundedAdmin) {
        result = await userModel.findOneAndUpdate(
          { _id: id },
          { email },
          { new: true }
        )
    }

      if(photo && foundedAdmin) {
        result = await userModel.findOneAndUpdate(
            { _id: id },
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
    getLoginUser,
    updateUser
}