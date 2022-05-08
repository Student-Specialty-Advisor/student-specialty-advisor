const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: process.env.AUTH_EMAIL_USER,
    pass: process.env.AUTH_EMAIL_PASS,
  },
  secure: true,
});

const sendEmail = (to, subject, text, html, withLogo) => {
  const mailData = {
    from: process.env.AUTH_EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
    attachments:
      withLogo === true
        ? [
            {
              filename: "logo_white.png",
              path: "./resources/logo_white.png",
              cid: "unique@logo.ssa-api",
            },
          ]
        : null,
  };
  if (process.env.SHOULD_SEND_EMAIL === "YES") {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (error, info) => {
        try {
          if (error) {
            reject({ error: error, message: error });
          }
          resolve({
            success: 1,
            message: "Email was sent successfully",
            message_id: info.messageId,
          });
        } catch (exception) {
          reject({ error: exception, message: "exception" });
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        success: 1,
        message:
          "Dev mode is enabled, therefore no email was sent. If you want to send an email, change SHOULD_SEND_EMAIL to YES",
      });
    });
  }
};

module.exports = {
  sendEmail: sendEmail,
};
