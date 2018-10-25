const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jatin.ddev@gmail.com',
    pass: 'Div@Devg'
  }
});

const verMail = (to, verLink) => {
  var mailOptions = {
    from: 'jatin.ddev@gmail.com',
    to,
    subject: 'Verification mail!',
    html: `<a href="${verLink}">click here to verify your account!</a>`
  };


  return transporter.sendMail(mailOptions);
  }


module.exports = verMail;
