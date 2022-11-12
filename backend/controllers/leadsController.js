const userModel = require("../models/Users");
const leadModel = require("../models/lead");
const { validationResult } = require("express-validator");
const sendMail = require('../config/sendMail');

const getLeads = async (req, res) => {
  try {
    const allLeads = await leadModel.find();

    if (allLeads.length > 0) {
      res.status(200).json({
        msg: `${allLeads.length} Leads Found`,
        data: allLeads,
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
};

const getFilteredLeads = async(req, res) => {
  try {
    const { month, status, counselor } = req.body;
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    
    // 1. when month, status and counselor-name is passed in filter body
    if(month !== '' && status !== '' && counselor !== '') {
      let monthNum = Number(month.slice(5, month.length));
      let yearNum = Number(month.slice(0, 4));
      const lessMonthToFilter = monthNum - 1;

      const dateMin = new Date(yearNum, lessMonthToFilter);
      const dateMax = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
      
      const founedCounselorId = await userModel.findOne({ name: counselor }, "-name -email -password -role -photo -__v");
      const filteredMonths = await leadModel.find(
        { "createdAt": { "$gte": dateMin, "$lte": dateMax }, "status": status, "counselor": founedCounselorId._id },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
            filteredMonths
        }
      });
    }

    // 2. when month and status are present
    if(month !== "" && status !== "" && counselor === "") {
      let monthNum = Number(month.slice(5, month.length));
      let yearNum = Number(month.slice(0, 4));
      const lessMonthToFilter = monthNum - 1;

      const dateMin = new Date(yearNum, lessMonthToFilter);
      const dateMax = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
      
      const filteredMonths = await leadModel.find(
        { "createdAt": { "$gte": dateMin, "$lte": dateMax }, "status": status },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status
        },
        filteredData: {
            docs: filteredMonths.length,
            filteredMonths
        }
      });
    }

    // 3. when month and counselor are present
    if(month !== "" && counselor !== "" && status === "") {
      let monthNum = Number(month.slice(5, month.length));
      let yearNum = Number(month.slice(0, 4));
      const lessMonthToFilter = monthNum - 1;

      const dateMin = new Date(yearNum, lessMonthToFilter);
      const dateMax = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
      
      const founedCounselorId = await userModel.findOne({ name: counselor }, "-name -email -password -role -photo -__v");
      const filteredMonths = await leadModel.find(
        { "createdAt": { "$gte": dateMin, "$lte": dateMax }, "counselor": founedCounselorId._id },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
            filteredMonths
        }
      });
    }

    // 4. when status and counselor are present
    if(month === "" && counselor !== "" && status !== "") {
      const founedCounselorId = await userModel.findOne({ name: counselor }, "-name -email -password -role -photo -__v");
      const filteredMonths = await leadModel.find(
        { "status": status, "counselor": founedCounselorId._id },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
            filteredMonths
        }
      });
    }

    // 5. when only month is present 
    if(month !== '' && status === '' && counselor === '') {
      let monthNum = Number(month.slice(5, month.length));
      let yearNum = Number(month.slice(0, 4));
      const lessMonthToFilter = monthNum - 1;

      const dateMin = new Date(yearNum, lessMonthToFilter);
      const dateMax = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
      
      const filteredMonths = await leadModel.find(
        { "createdAt": { "$gte": dateMin, "$lte": dateMax } },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
            filteredMonths
        }
      });
    }

    // 6. when only status is present
    if(month === '' && status !== '' && counselor === '') {
      const filteredMonths = await leadModel.find(
        { "status": status },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
            filteredMonths
        }
      });
    }

    // 7. when only counselor is present 
    if(month === '' && status === '' && counselor !== '') {
      const founedCounselorId = await userModel.findOne({ name: counselor }, "-name -email -password -role -photo -__v");
      const filteredMonths = await leadModel.find(
        { "counselor": founedCounselorId._id },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
            filteredMonths
        }
      });
    }

    // 8. when no filter is present
    if(month === '' && status === '' && counselor === '') {
      const { page } = req.params;
      const count = await leadModel.find().countDocuments();
      const perPage = 5;
      const skip = (page - 1) * perPage;
      const allLeads = await leadModel.find().skip(skip).limit(perPage);

      if(allLeads.length > 0) {
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
    }
  } catch(err) {
    res.status(404).json({
      msg: err.message
    })
  }
}

const getLeadsByPage = async (req, res) => {
  try {
    const { month, status, counselor } = req.query;
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    
    // 1. when month, status and counselor name is passed in filter body
    if(month !== '' && status !== '' && counselor !== '') {
      let monthNum = Number(month.slice(5, month.length));
      let yearNum = Number(month.slice(0, 4));
      const lessMonthToFilter = monthNum - 1;

      const dateMin = new Date(yearNum, lessMonthToFilter);
      const dateMax = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
      
      const founedCounselorId = await userModel.findOne({ name: counselor }, "-name -email -password -role -photo -__v");
      const filteredMonths = await leadModel.find(
        { "createdAt": { "$gte": dateMin, "$lte": dateMax }, "status": status, "counselor": founedCounselorId._id },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
        },
        data: filteredMonths
      });
    }

    // 2. when month and status are present
    if(month !== "" && status !== "" && counselor === "") {
      let monthNum = Number(month.slice(5, month.length));
      let yearNum = Number(month.slice(0, 4));
      const lessMonthToFilter = monthNum - 1;

      const dateMin = new Date(yearNum, lessMonthToFilter);
      const dateMax = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
      
      const filteredMonths = await leadModel.find(
        { "createdAt": { "$gte": dateMin, "$lte": dateMax }, "status": status },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status
        },
        filteredData: {
            docs: filteredMonths.length,
        },
        data: filteredMonths
      });
    }

    // 3. when month and counselor are present
    if(month !== "" && counselor !== "" && status === "") {
      let monthNum = Number(month.slice(5, month.length));
      let yearNum = Number(month.slice(0, 4));
      const lessMonthToFilter = monthNum - 1;

      const dateMin = new Date(yearNum, lessMonthToFilter);
      const dateMax = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
      
      const founedCounselorId = await userModel.findOne({ name: counselor }, "-name -email -password -role -photo -__v");
      const filteredMonths = await leadModel.find(
        { "createdAt": { "$gte": dateMin, "$lte": dateMax }, "counselor": founedCounselorId._id },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length
        },
        data: filteredMonths
      });
    }

    // 4. when status and counselor are present
    if(month === "" && counselor !== "" && status !== "") {
      const founedCounselorId = await userModel.findOne({ name: counselor }, "-name -email -password -role -photo -__v");
      const filteredMonths = await leadModel.find(
        { "status": status, "counselor": founedCounselorId._id },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
        },
        data: filteredMonths
      });
    }

    // 5. when only month is present 
    if(month !== '' && status === '' && counselor === '') {
      let monthNum = Number(month.slice(5, month.length));
      let yearNum = Number(month.slice(0, 4));
      const lessMonthToFilter = monthNum - 1;

      const dateMin = new Date(yearNum, lessMonthToFilter);
      const dateMax = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
      
      const filteredMonths = await leadModel.find(
        { "createdAt": { "$gte": dateMin, "$lte": dateMax } },
        ).skip(skip).limit(perPage);
        res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
        },
        data: filteredMonths
      });
    }

    // 6. when only status is present
    if(month === '' && status !== '' && counselor === '') {
      const filteredMonths = await leadModel.find(
        { "status": status },
      ).skip(skip).limit(perPage);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        filteredData: {
            docs: filteredMonths.length,
        },
        data: filteredMonths
      });
    }

    // 7. when only counselor is present 
    if(month === '' && status === '' && counselor !== '') {
      const founedCounselorId = await userModel.findOne({ name: counselor }, "-name -email -password -role -photo -__v");
      const filteredMonths = await leadModel.find(
        { "counselor": founedCounselorId._id },
      ).skip(skip).limit(perPage);
      console.log(filteredMonths);
      res.status(200).json({
        msg: 'filters received',
        filters: {
          month,
          status,
          counselor
        },
        data: filteredMonths,
        filteredData: {
            docs: filteredMonths.length,
        }
      });
    }

    // 8. when no filter is present
    if(month === '' && status === '' && counselor === '') {
      const { page } = req.params;
      const count = await leadModel.find().countDocuments();
      const perPage = 5;
      const skip = (page - 1) * perPage;
      const allLeads = await leadModel.find().skip(skip).limit(perPage);

      if(allLeads.length > 0) {
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
    }


  } catch(err) {
    res.status(404).json({
      msg: err.message
    })
  }
};

const addLead = async (req, res) => {
  const { leadTitle, name, leadEmail, leadPhone, leadDesc, courseName, refName, refPhone } =
  req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const createdLead = await leadModel.create({
        title: leadTitle,
        name,
        email: leadEmail,
        phone: leadPhone,
        description: leadDesc,
        course: courseName,
        reference: {
          name: refName,
          phoneNo: refPhone
        },
        counselor: req.tokenInfo.id,
      });

      if (createdLead) {
        sendMail("created", req.tokenInfo ,createdLead);
        res.status(201).json({
          msg: "lead created successfully",
          leadDetails: createdLead,
        });
      } else {
        res.status(401).json({
          msg: "Could not create lead",
        });
      }
    } catch (err) {
      if(err.message.includes('phone')) {
        console.log(req.body);
        return res.status(500).json({ msg: "Phone no. already exists" });
      } else if(err.message.includes('email')) {
        return res.status(500).json({ msg: "Email already exists" });
      } else {
        return res.status(500).json({ msg: err.message });
      }

    }
  } else {
    res.status(401).json({ errors: errors.array() });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await leadModel.findById({ _id: req.params.leadId });
    if (lead) {
      res.status(200).json({
        msg: "Lead Found",
        data: lead,
      });
    }
  } catch (err) {
    res.status(401).json({
      msg: err.message,
    });
  }
};

const getLeadsByCounselorId = async (req, res) => {
  try {
    const leads = await leadModel.find(
      { counselor: req.params.counselorId },
      "-counselor"
    );

    const counselor = await userModel.findOne(
      { _id: req.params.counselorId },
      "-email -role -password"
    );

    const counselorName = (counselor && counselor.name) || "counselor";
    if (leads) {
      res.status(200).json({
        msg: `${leads.length} leads found by ${counselorName}`,
        data: leads,
      });
    } else {
      res.status(401).json({
        msg: "Counselors not found",
      });
    }
  } catch (err) {
    res.status(401).json({
      msg: err.message,
    });
  }
};

const updateOneLead = async (req, res) => {
  let result;
  const _id = req.params.leadId;
  const { title, name, status, description, phone, course, email, refName, refPhone } = req.body;

  try {
    if (title) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { title },
        { new: true }
      );
    }

    if (name) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { name },
        { new: true }
      );
    }

    if (status) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { status },
        { new: true }
      );
    }

    if (description) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { description },
        { new: true }
      );
    }

    
    if (phone) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { phone },
        { new: true }
      );
    }

    
    if (email) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { email },
        { new: true }
      );
    }

    
    if (course) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { course },
        { new: true }
      );
    }

    if (refName) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { "reference.name": refName },
        { new: true }
      );
    }

    if (refPhone) {
      result = await leadModel.findOneAndUpdate(
        { _id },
        { "reference.phoneNo": refPhone },
        { new: true }
      );
    }

    if(result) {
      res.status(200).json({
        msg: "Lead updated successfully.",
        data: result,
      });
    } else {
      throw new Error("server Error");
    }
  } catch (err) {
    res.status(401).json({
      msg: err.message,
    });
  }
};

const deleteOneLead = async (req, res) => {
  try {
    const result = await leadModel.deleteOne({ _id: req.params.leadId });
    if (result) {
        res.status(201).json({
            msg: "lead successfully deleted",
            data: result
        })
    } else {
        throw new Error("not deleted.");
    }
  } catch (err) {
    res.status(401).json({
      msg: err.message,
    });
  }
};

module.exports = {
  getLeads,
  addLead,
  getLeadById,
  getLeadsByCounselorId,
  updateOneLead,
  deleteOneLead,
  getLeadsByPage,
  getFilteredLeads
};
