const Comment = require("../db/Comment");
const Thread = require("../db/Thread");
var getThreads = (req, res) => {
  Thread.find({})
    .then((threads) => {
      res.status(200).send({ success: 1, threads: threads });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

var getComments = (req, res) => {
  Thread.findOne(req.params)
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: { firstName: 1, lastName: 1, universityYear: 1 },
      },
    })
    .then((thread) => {
      res.status(200).send({ success: 1, comments: thread.comments });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

var saveComments = (req, res) => {
  const newComment = new Comment(req.body);
  newComment
    .save()
    .then((comment) => {
      Thread.findOneAndUpdate(
        req.params,
        { $push: { comments: comment._id } },
        { new: true }
      )
        .then((newThread) => {
          if (newThread === null)
            res
              .status(500)
              .send({ error: 1, errorObject: "thread was not found" });
          else res.status(200).send({ success: 1, thread: newThread });
        })
        .catch((error) => {
          res.status(500).send({ error: 1, errorObject: error });
        });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

var createThread = (req, res) => {
  const newThread = new Thread(req.body);
  newThread
    .save()
    .then((thread) => {
      res.status(200).send({ success: 1, thread: thread });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

exports.getThreads = getThreads;
exports.getComments = getComments;
exports.saveComments = saveComments;
exports.createThread = createThread;
