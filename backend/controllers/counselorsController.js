const userModel = require('../models/Users');

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

module.exports = {
    getCounselors
}