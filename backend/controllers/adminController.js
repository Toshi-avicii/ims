const leadModel = require("../models/lead");
const userModel = require("../models/Users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/envConfig");

const adminProfile = async (req, res) => {
  const result = await userModel.find({ role: req.body.role }, "-role");
  try {
    if (result) {
      res.status(200).json({
        msg: "admin details",
        data: result,
      });
    }
  } catch (err) {
    res.status(401).json({
      msg: err.message,
    });
  }
};

// const createAdmin = async (req, res) => {
//   const { name, email, password } = req.body;
//   const errors = validationResult(req);
//   try {
//     const result = await userModel.find({ email });

//     if (errors.isEmpty() && !result) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       const createQuery = await userModel.create({
//         name,
//         email,
//         password: hashedPassword,
//         role: "admin",
//       });
//       if (createQuery) {
// const token = jwt.sign(
//     { id: createQuery._id, name, email, role: "admin" },
//     env.JWT_KEY, {expiresIn: '1d'}
//     );
//         res.status(201).json({
//           msg: "Admin created successfully",
//           data: createQuery, token
//         });
//       } else {
//         return res.status(500).json({ msg: "Admin not created." });
//       }
//     } else if (errors.isEmpty() && result) {
//       return res.status(400).json({
//         msg: "Email already exists",
//       });
//     } else {
//       res.status(401).json({ errors: errors.array() });
//     }
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

module.exports = {
  adminProfile,
  // updateAdmin,
  //   createAdmin,
};
