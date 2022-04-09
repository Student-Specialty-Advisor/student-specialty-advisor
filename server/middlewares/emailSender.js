const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: process.env.AUTH_EMAIL_USER,
    pass: process.env.AUTH_EMAIL_PASS,
  },
  secure: true,
});

const sendEmail = (to, subject, text, html) => {
  const mailData = {
    from: process.env.AUTH_EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  if (process.env.SHOULD_SEND_EMAIL === "YES") {
    transporter.sendMail(mailData, (error, info) => {
      try {
        if (error) {
          console.log(error);
          return null;
        }
        return {
          success: 1,
          message: "Email was sent successfully",
          message_id: info.messageId,
        };
      } catch (exception) {
        console.log(exception);
        return null;
      }
    });
  } else {
    return {
      success: 1,
      message:
        "Dev mode is enabled, therefore no email was sent. If you want to send an email, change SHOULD_SEND_EMAIL to YES",
    };
  }
};

module.exports = {
  sendEmail: sendEmail,
};
