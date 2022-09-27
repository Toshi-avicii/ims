const userModel = require("../models/Users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const getCounselors = async (req, res) => {
  const result = await userModel.find({ role: "counselor" });
  if (result.length > 0) {
    res.status(200).json({
      counselors: result,
    });
  } else {
    return res.status(401).json({ msg: "no counselors found." });
  }
};

const addCounselor = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const result = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role: "counselor",
      });

      if (result) {
        res.status(201).json({
          msg: "counselor created successfully",
          counselorDetails: result,
        });
      } else {
        res.status(401).json({
          msg: "Could not create counselor",
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Email already exists" });
    }
  } else {
    res.status(401).json({ errors: errors.array() });
  }
};

const deleteCounselors = async (req, res) => {
  try {
    const deletedUsers = await userModel.deleteMany({ role: "counselor" });
    if (deletedUsers) {
      res.status(200).json({
        msg: "users deleted successfully",
        data: deletedUsers,
      });
    } else {
      res.status(401).json({
        msg: "No users found",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

const getOneCounselor = async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.counselorId });
  if (user) {
    res.status(200).json({
      msg: "Data generated successfully",
      data: user,
    });
  } else {
    res.status(401).json({
      msg: "There is an error",
    });
  }
};

const updateCounselor = async (req, res) => {
  let result;

  try {
    if (req.body.name) {
      result = await userModel.findOneAndUpdate(
        { _id: req.params.counselorId },
        { name: req.body.name },
        { new: true }
      );
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      result = await userModel.findOneAndUpdate(
        { _id: req.params.counselorId },
        { password: hashedPassword },
        { new: true }
      );
    }

    if (req.body.email) {
      result = await userModel.findOneAndUpdate(
        { _id: req.params.counselorId },
        { email: req.body.email },
        { new: true }
      );
    }

    res.status(201).json({
      msg: "Counselor updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(401).json({
      msg: "Some error occurred",
    });
  }
};

module.exports = {
  getCounselors,
  addCounselor,
  deleteCounselors,
  getOneCounselor,
  updateCounselor,
};
