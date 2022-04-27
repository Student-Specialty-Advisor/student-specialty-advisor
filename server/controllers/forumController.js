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
      populate: { path: "user", select: { firstName: 1, lastName: 1 } },
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

var deleteThread = (req, res) => {
  Thread.findOneAndDelete(req.params)
    .then((deletedThread) => {
      if (deletedThread === null)
        res.status(500).send({ error: 1, errorObject: "thread was not found" });
      else {
        Comment.findOneAndDelete(deletedThread._id)
          .then((comment) => {
            res.status(200).send({ success: 1, comment: comment });
          })
          .catch((error) => {
            res.status(500).send({ error: 1, errorObject: error });
          });
      }
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

var deleteComment = (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((comment) => {
      res.status(200).send({ success: 1, deletedComment: comment });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};
exports.getThreads = getThreads;
exports.getComments = getComments;
exports.saveComments = saveComments;
exports.createThread = createThread;
exports.deleteThread = deleteThread;
exports.deleteComment = deleteComment;
