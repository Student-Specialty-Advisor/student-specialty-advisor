const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: process.env.AUTH_EMAIL_USER,
    pass: process.env.AUTH_EMAIL_PASS,
  },
  secure: true,
});

const sendEmail = (to, subject, text, html, res) => {
  const mailData = {
    from: process.env.AUTH_EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.status(500).send(error);
    }
    res
      .status(200)
      .send({ message: "Email was sent successfully.", id: info.messageId });
  });
};

module.exports = {
  sendEmail: sendEmail,
};