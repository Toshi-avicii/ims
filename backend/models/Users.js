const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: [true, "Email is already taken"]
    },
    password: {
        type: String,
        require: true,
        minlength: [6, "password must be equal or greater than 6 characters"]
    },
    role: {
        type: String,
        require: [true, "role must be required"]
    },
    photo: {
        type: String,
        default: 'user-default.png'
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;