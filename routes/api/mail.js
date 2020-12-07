const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');



// @route  POST  api/emails
// @desc   send contact us email
// @access Public 

router.post ('/' , async (req,res) => {


const {name,email,subject,message} =req.body ;

console.log(req.body);

const htmlEmail = `
<h3> Contact Details</h3>
<ul>
<li> Name: ${name} </li>
<li> Email: ${email} </li>
</ul>
<h3> Messages </h3>
<p> ${message}</p>

`
const transporter = nodeMailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'akeem.oreilly@ethereal.email',
      pass: 'kvMc7r68t9dwCyYsHN'
  }
});

// send mail with defined transport object
let info = await transporter.sendMail({
  from: '"The Baron" <akeem.oreilly@ethereal.email>', // sender address
  to: '"ADMIN" <barouni.hakim@gmail.com>', // list of receivers
  subject:`${subject}`, // Subject line
  text: `${message}`, // plain text body
  html: htmlEmail, // html body
});

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...










})

module.exports = router;