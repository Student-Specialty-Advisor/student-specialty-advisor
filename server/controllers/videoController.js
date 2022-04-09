const Video = require("../db/Video");

var getListOfVideos = (req, res) => {
  Video.find({})
    .then((videos) => {
      res.status(200).send(videos);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var getAVideo = (req, res) => {
  Video.find(req.params)
    .then((video) => {
      res.status(200).send(video);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var postVideo = (req, res) => {
  const newVideo = new Video(req.body);
  newVideo
    .save()
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var deleteVideo = (req, res) => {
  Video.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.getListOfVideos = getListOfVideos;
exports.getAVideo = getAVideo;
exports.postVideo = postVideo;
exports.deleteVideo = deleteVideo;
