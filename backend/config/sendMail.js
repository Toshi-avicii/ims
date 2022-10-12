const userModel = require('../models/Users');
const nodemailer = require('nodemailer');

async function sendMail(str, tokenInfo ,data) {
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
  
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "tushar.toshi12@gmail.com", // generated ethereal user
                pass: "nmxelsakrbuayfxd", // generated ethereal password
            },
        });

        let Osubject, Ohtml;

        if(str === "created") {
            Osubject = "A lead has been generated by " + tokenInfo.name + ' on ' + data.date;
            Ohtml = `
                <div style="background-color: #f1f1f1;">
                    <div style="background-color: #0C0404; padding: 6px 1rem;">
                        <h1 style="color: white;">Lead Generated Successfully!</h1>
                    </div>
                    <div style="padding: 10px 1rem;">
                        <h3>Lead Details: </h3>
                        <p>Name - ${data.name}</p>
                        <p>Email - ${data.email}</p>
                        <p>Phone - ${data.phone}</p>
                        <p>Lead Title - ${data.title}</p>
                        <p>Course Interested In - ${data.course.toUpperCase()}</p>
                        <p>${data.reference ? `Reference: ${data.reference.name}` : 'Reference: No one' }</p>
                    </div>
                </div>
            `;
        }

        const admin = await userModel.findOne({ role: 'admin' });


        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: admin.email, // sender address
            to: "tushar.toshi12@gmail.com", // list of receivers
            subject: Osubject, // Subject line
            html: Ohtml, // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...   
    } catch(err) {
        console.log(err.message);
    }
  }

  module.exports = sendMail;