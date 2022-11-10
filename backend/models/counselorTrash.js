const mongoose = require('mongoose');

const counselorTrashSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        default: 'user-default.png'
    }
});

const counselorTrashModel = mongoose.model("counselorTrash", counselorTrashSchema);
module.exports = counselorTrashModel;
