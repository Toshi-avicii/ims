const userModel = require("../models/Users");
const counselorTrashModel = require("../models/counselorTrash");

const moveToTrash = async(req, res) => {
    try {
        const { counselorId } = req.params;
        const deletedcounselor = await userModel.findOne({ _id: counselorId });
        if(deletedcounselor) {
            const trashedCounselor = await counselorTrashModel.create({
                _id: deletedcounselor._id,
                name: deletedcounselor.name,
                email: deletedcounselor.email,
                password: deletedcounselor.password,
                role: deletedcounselor.role,
                photo: deletedcounselor.photo
            });
            const deleteFromCounselors = await userModel.deleteOne({ _id: counselorId });
            if(deleteFromCounselors) {
                res.status(201).json({
                    msg: 'counselor retrieved',
                    data: trashedCounselor
                });
            } else {
                throw new Error('Could not delete the lead')
            }
        } else {
            throw new Error('Could not find the counselor')
        }
    } catch (err) {
        res.status(401).json({
            msg: err.message
        })
    }
}

const getTrashedData = async(req, res) => {
    try {
        const { page } = req.params;
        const count = await counselorTrashModel.find().countDocuments();
        const perPage = 5;
        const skip = (page - 1) * perPage;
        const allTrashedData = await counselorTrashModel.find().skip(skip).limit(perPage);
        if(allTrashedData.length > 0) {
            res.status(200).json({
                msg: `${allTrashedData} counselor found`,
                data: allTrashedData,
                count,
                perPage
            });
        } else {
            throw new Error('No counselor found');
        }
    } catch (err) {
        res.status(401).json({
            msg: err.message
        })
    }
}

const deletePermanently = async(req, res) => {
    try {
        const { counselorId } = req.params;
        // console.log(counselorId)
        const deleteCounselor = await counselorTrashModel.findOneAndDelete({ id: counselorId });
        if(deleteCounselor) {
            res.status(201).json({
                msg: "Successfully Deleted"
            })
        } else {
            throw new Error("there is an error to deleted this counselor")
        }
    } catch (err) {
        res.status(401).json({
            msg: err.message
        })
    }
}

const recoverFromTrash = async(req, res) => {
    try {
        const { counselorId } = req.params;
        const deleteCounselor = await counselorTrashModel.findOne({ _id: counselorId });
        if(deleteCounselor) {
            const recoveredCounselor = await userModel.create({
                _id: deleteCounselor._id,
                name: deleteCounselor.name,
                email: deleteCounselor.email,
                password: deleteCounselor.password,
                role: deleteCounselor.role,
                photo: deleteCounselor.photo
            });
            
            if(recoveredCounselor) {
                await counselorTrashModel.deleteOne({ _id: counselorId });
                res.status(201).json({
                    msg: 'counselor recovered',
                    data: recoveredCounselor
                })
            } else {
                throw new Error('could not recovered counselor')
            }
        }
        
    } catch (err) {
        res.status(401).json({
            msg: err.message
        })
    }
}

module.exports = {
    moveToTrash,
    getTrashedData,
    deletePermanently,
    recoverFromTrash,
}