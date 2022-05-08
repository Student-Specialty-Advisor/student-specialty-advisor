const Advisor = require("../db/Advisor");
const Meeting = require("../db/Meeting");
const { sendEmail } = require("../middlewares/emailSender");
const specialties = ["SE", "CSE", "REE"];
const scheduleRows = ["8", "9", "10", "11", "12", "1", "2", "3", "4"];
const scheduleCols = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  if (specialties.includes(req.body.specialty)) {
    const newAdvisor = new Advisor(req.body);
    newAdvisor
      .save()
      .then(() => {
        res.status(200).send({ success: 1 });
      })
      .catch((error) => {
        res.status(500).send({ error: 1, errorObject: error });
      });
  } else {
    res.status(500).send({
      error: 1,
      errorObject: "Invalid specialty format: can only accept SE/CSE/REE",
    });
  }
};

var deleteAdvisor = (req, res) => {
  Advisor.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

var updateAdvisor = (req, res) => {
  Advisor.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((newAdvisor) => {
      res.status(200).send({ success: 1, advisor: newAdvisor });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

var getListOfMeetings = (req, res) => {
  Meeting.find({})
    .populate("advisor")
    .then((meetings) => {
      const currentDay = new Date();
      res.status(200).send({
        success: 1,
        currentDayIndex: currentDay.getDay(),
        meetings: meetings,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var deleteMeeting = (req, res) => {
  Meeting.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

var postMeeting = (req, res) => {
  const meetingData = {
    ...req.body,
    row: scheduleRows.indexOf(req.body.from),
    col: scheduleCols.indexOf(req.body.day),
  };

  if (meetingData.row === -1 || meetingData.col === -1) {
    res.status(500).send({
      error:
        "Invalid request: check format of day or time.(Monday..Saturday | 8..12, 1..4)",
    });
  } else {
    const newMeeting = new Meeting(meetingData);
    newMeeting
      .save()
      .then((saved) => {
        Meeting.populate(saved, { path: "advisor" }, function (err, meeting) {
          if (err) {
            res.status(500).send({ error: 1, errorObject: error });
            return;
          }
          res.status(200).send({ success: 1, meeting: meeting });
        });
      })
      .catch((error) => {
        res.status(500).send({ error: 1, errorObject: error });
      });
  }
};

var requestMeeting = (req, res) => {
  const data = req.body; // to, day, from, userName, userEmail, universityYear, reason
  const email = {
    subject:
      "Student Specialty Advisor: " +
      data.userName +
      " requests a meeting with you!",
    text: "",
    html:
      "<div style='padding:5px; background-color: #10A5F5;'>" +
      "<div style='text-align: center; background-color: rgb(32, 53, 73);' >" +
      "<br/><p style='text-align:left; margin-left:5%; margin-right:5%; color:white;'><span style='font-style: bold'>Dear Advisor,</span><br/><br/>We wanted to let you know that member <strong>" +
      data.userName +
      "</strong> has requested a meeting with you on <strong>" +
      data.day +
      " at " +
      data.from +
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
      "<a href='https://student-specialty-advisor.herokuapp.com/' target='_blank' rel='noreferrer noopener'><div style='width:100%; background-color: rgb(15, 25,33); padding-top: 2%; padding-bottom: 2%;'><img style='width:25%;' src='cid:unique@logo.ssa-api' alt=''/></div></a>" +
      "</div></div>",
  };
  Meeting.findById(data.meetingID).then((meeting) => {
    if (meeting === null) {
      res.status(500).send({ error: 1, message: "Meeting was not found" });
      return;
    }
    if (meeting.isAvailable === false) {
      res.status(500).send({ unavailable: 1 });
      return;
    } else if (meeting.isAvailable === true) {
      sendEmail(data.to, email.subject, email.text, email.html, true)
        .then((status) => {
          if (status.success) {
            Meeting.findByIdAndUpdate(
              data.meetingID,
              { isAvailable: false, userName: data.userName },
              { new: true }
            )
              .then((meeting) => {
                res.status(200).send({
                  success: 1,
                  message: status.message,
                  meeting: meeting,
                });
              })
              .catch((error) => {
                res.status(500).send(error);
              });
          } else {
            res.status(500).send(status);
          }
        })
        .catch((error) => {
          res.status(500).send({
            error: 1,
            message: "Aborted request because email was not sent",
            errorObject: error,
          });
          return;
        });
    } else {
      res.status(500).send({ error: 1 });
    }
  });
};

var unlockRequestedMeetings = (req, res) => {
  Meeting.updateMany({}, { isAvailable: true })
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

exports.getListOfAdvisors = getListOfAdvisors;
exports.postAdvisor = postAdvisor;
exports.deleteAdvisor = deleteAdvisor;
exports.updateAdvisor = updateAdvisor;
exports.getListOfMeetings = getListOfMeetings;
exports.postMeeting = postMeeting;
exports.deleteMeeting = deleteMeeting;
exports.requestMeeting = requestMeeting;
exports.unlockRequestedMeetings = unlockRequestedMeetings;
