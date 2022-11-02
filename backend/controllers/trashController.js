const leadTrashModel = require('../models/LeadTrash');
const leadModel = require('../models/lead');

const moveToTrash = async(req, res) => {
    try {
        const { leadId } = req.params;
        const deletedLead = await leadModel.findOne({ _id: leadId });
        if(deletedLead) {
            const insertedLead = await leadTrashModel.create({
                _id: deletedLead._id,
                leadTitle: deletedLead.title,
                leadName: deletedLead.name,
                leadEmail: deletedLead.email,
                leadPhone: deletedLead.phone,
                leadDescription: deletedLead.description,
                leadCourse: deletedLead.course,
                leadReference: {
                    name: deletedLead.reference.name,
                    phoneNo: deletedLead.reference.phoneNo
                },
                leadStatus: deletedLead.status,
                leadCounselor: deletedLead.counselor
            });

            const deleteFromLeads = await leadModel.deleteOne({ _id: leadId });
            if(deleteFromLeads) {
                res.status(200).json({
                    msg: 'lead retrieved',
                    data: insertedLead
                });
            } else {
                throw new Error('Could not delelte the lead');
            }
        } else {
            throw new Error('Cannot find the lead');
        }
    } catch(err) {
        console.log(err.message);
        res.status(401).json({
            msg: err.message
        })
    }
}

const recoverFromTrash = async(req, res) => {
    try {
        const { leadId } = req.params;
        const deletedLead = await leadTrashModel.findOne({ _id: leadId });
        if(deletedLead) {
            const recoveredLead = await leadModel.create({
                _id: deletedLead._id,
                title: deletedLead.leadTitle,
                name: deletedLead.leadName,
                email: deletedLead.leadEmail,
                phone: deletedLead.leadPhone,
                description: deletedLead.leadDescription,
                course: deletedLead.leadCourse,
                reference: {
                    name: deletedLead.leadReference.name,
                    phoneNo: deletedLead.leadReference.phoneNo
                },
                status: deletedLead.leadStatus,
                counselor: deletedLead.leadCounselor
            });

            if(recoveredLead) {
                await leadTrashModel.deleteOne({ _id: leadId });
                res.status(200).json({
                    msg: 'lead recovered',
                    data: recoveredLead
                })
            } else {
                throw new Error('Could not recover lead');
            }
        }
    } catch(err) {
        console.log(err);
        res.status(401).json({
            msg: err.message
        })
    }
}

const deletePermanently = async(req, res) => {
    try {
        const { leadId } = req.params;
        const deletedLead = await leadTrashModel.findOneAndDelete({ _id: leadId });
        if(deletedLead) {
            res.status(200).json({
                msg: 'Lead Deleted Successfully'
            })
        } else {
            throw new Error('Error Occurred');
        }
    } catch(err) {
        res.status(401).json({
            msg: err.message
        })
    }
}

const getTrashLeadsByPage = async (req, res) => {
    try {
      //for pagination...
      const { page } = req.params;
      const count = await leadTrashModel.find().countDocuments();
      const perPage = 5;
      const skip = (page - 1) * perPage;
      const allLeads = await leadTrashModel.find().skip(skip).limit(perPage);
  
      if (allLeads.length > 0) {
        res.status(200).json({
          msg: `${allLeads.length} Leads Found`,
          data: allLeads,
          perPage,
          count
        });
      } else {
        res.status(200).json({
          msg: "No Leads Found",
        });
      }
    } catch (err) {
      res.status(401).json({
        msg: err.message,
      });
    }
}

module.exports = {
    moveToTrash,
    recoverFromTrash,
    deletePermanently,
    getTrashLeadsByPage 
}