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

var requestMeeting = (req, res) => {};

exports.getListOfAdvisors = getListOfAdvisors;
exports.postAdvisor = postAdvisor;
exports.getListOfMeetings = getListOfMeetings;
exports.postMeeting = postMeeting;
exports.requestMeeting = requestMeeting;
