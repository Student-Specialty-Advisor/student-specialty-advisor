const Advisor = require("../db/Advisor");
const Meeting = require("../db/Meeting");
const { sendEmail } = require("../middlewares/emailSender");

var getListOfAdvisors = (req, res) => {
  Advisor.find({})
    .then((advisors) => {
      res.status(200).send(advisors);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var postAdvisor = (req, res) => {
  const newAdvisor = new Advisor(req.body);
  newAdvisor
    .save()
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
var getListOfMeetings = (req, res) => {
  Meeting.find({})
    .then((meetings) => res.status(200).send(meetings))
    .catch((error) => res.status(500).send(error));
};

var postMeeting = (req, res) => {
  const newMeeting = new Meeting(req.body);
  newMeeting
    .save()
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var requestMeeting = (req, res) => {
  const data = req.body; // to, day, at, userName, userEmail, universityYear, reason
  const email = {
    subject:
      "Student Specialty Advisor: " +
      data.userName +
      " requests a meeting with you!",
    text: "",
    html:
      "<div style='padding:5px; background-color: #10A5F5; border-radius: 25px;'>" +
      "<div style='text-align: center; background-color: rgb(32, 53, 73); border-radius:25px;' >" +
      "<br/><p style='text-align:left; margin-left:5%; margin-right:5%; color:white;'><span style='font-style: bold'>Dear Advisor,</span><br/><br/>We wanted to let you know that member <strong>" +
      data.userName +
      "</strong> has requested a meeting with you on <strong>" +
      data.day +
      " at " +
      data.at +
      "</strong>." +
      "<br/><br/><strong>" +
      data.userName +
      "</strong> has signed up as a <strong>" +
      data.universityYear +
      "</strong> and wishes to contact you to seek advice and discuss <strong>'" +
      data.reason +
      "'</strong>." +
      "<br/><br/>You can reach them at the following E-mail: <strong>" +
      data.userEmail +
      "</strong>" +
      "<br/><br/>If you have any concerns, please contact us at studentspecialtyadvisor@outlook.com" +
      "<br/><br/>As always, we are extremely grateful for your effort as an advisor to the South Mediterranean University community and we thank you for your time and understanding." +
      "<br/><br/><br/><i>By Students, For Students,<br/>The Student Specialty Advisor Team</i>" +
      "</p><br/>" +
      "<a href='https://student-specialty-advisor.herokuapp.com/' target='_blank' rel='noreferrer noopener'><div style='width:100%; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px; background-color: rgb(15, 25,33); padding-top: 2%; padding-bottom: 2%;'><img style='width:25%;' src= https://i.imgur.com/9oEMMqC.png alt=''/></div></a>" +
      "</div></div>",
  };
  sendEmail(data.to, email.subject, email.text, email.html, res);
};

exports.getListOfAdvisors = getListOfAdvisors;
exports.postAdvisor = postAdvisor;
exports.getListOfMeetings = getListOfMeetings;
exports.postMeeting = postMeeting;
exports.requestMeeting = requestMeeting;
