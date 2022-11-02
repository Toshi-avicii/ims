const mongoose = require('mongoose');

const leadTrashSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: true
    },
    leadTitle: {
        type: String,
        required: true
    },
    leadName: {
        type: String,
        required: true
    },
    leadEmail: {
        type: String,
        required: true
    },
    leadPhone: {
        type: String,
        required: true
    },
    leadDescription: {
        type: String,
        required: true
    },
    leadCourse: {
        type: String,
        lowercase: true,
        required: true
    },
    leadReference: {
        type: Object,
        name: {
            type: String,
            default: ""
        },
        phoneNo: {
            type: String,
            default: ""
        }
    },
    date: {
        type: Date,
        default: new Date()
    },
    leadStatus: {
        type: String,
        required: true
    },
    leadCounselor: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const leadTrashModel = mongoose.model("LeadTrash", leadTrashSchema);
module.exports = leadTrashModel;