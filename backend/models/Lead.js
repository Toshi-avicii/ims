const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already taken"]
    },
    phone: {
        type: String,
        required: true,
        unique: [true, "mobile no. is already taken"]
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: String,
        lowercase: true,
        enum: ["it expert" , "ms office", "dca"],
        required: true
    },
    reference: {
        type: Object,
        name: {
            type: String,
        },
        phoneNo: {
            type: String
        }
    },
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
        enum: ["Pending", "Resolved", "Rejected"]
    },
    counselor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const leadModel = mongoose.model("Lead", leadSchema);
module.exports = leadModel;