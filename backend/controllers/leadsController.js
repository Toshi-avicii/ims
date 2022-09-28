const userModel = require('../models/Users');
const leadModel = require("../models/lead");
const { validationResult } = require("express-validator");
const { Types } = require('mongoose');

const getLeads = async(req, res) => {
    try {
        const allLeads = await leadModel.find();

        if(allLeads.length > 0) {
            res.status(200).json({
                msg: 'Leads Found',
                data: allLeads
            });
        } else {
            res.status(200).json({
                msg: "No Leads Found"
            })
        }
    } catch(err) {
        res.status(401).json({
            msg: err.message
        });
    }
}

const addLead = async(req, res) => {
    const { leadTitle, name, leadEmail, leadPhone, leadDesc, counselor } = req.body;
    const errors = validationResult(req);
    
    if(errors.isEmpty()) {
        try {
            const createdLead = await leadModel.create({
                title: leadTitle,
                name,
                email: leadEmail,
                phone: leadPhone,
                description: leadDesc,
                counselor
            });

            if(createdLead) {
                res.status(201).json({
                    msg: "lead created successfully",
                    leadDetails: createdLead,
                });
            } else {
                res.status(401).json({
                    msg: "Could not create lead",
                });
            }
        } catch(err) {
            return res.status(500).json({ msg: "Lead already exists" });
        }
    } else {
        res.status(401).json({ errors: errors.array() });
    }
}

const getLeadById = async(req, res) => {
    try {
        const lead = await leadModel.findById({ _id: req.params.leadId });
        if(lead) {
            res.status(200).json({
                msg: "Lead Found",
                data: lead
            });
        }
    } catch(err) {
        res.status(401).json({
            msg: err.message
        });
    }
}

const getLeadsByCounselor = async(req, res) => {
    try {
        const leads = await leadModel.find({ counselor: req.params.counselorId }, '-counselor');
        const counselor = await userModel.findById({_id: req.params.counselorId}, '-email -role -password');
        if(leads) {
            res.status(200).json({
              msg: `leads made by ${counselor.name || "counselor"}`,
              data: leads
            })
          } else {
            res.status(401).json({
              msg: "Counselors not found"
            })
          }
    } catch(err) {
        res.status(401).json({
            msg: err.message
        })
    }
}
  
 
module.exports = {
    getLeads,
    addLead,
    getLeadById,
    getLeadsByCounselor,
};