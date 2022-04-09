const Video = require("../db/Video");

var getListOfAllVideos = (req, res) => {
  Video.find({})
    .then((videos) => {
      res.status(200).send(videos);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var getListOfVideosBySpecialty = (req, res) => {
  Video.find(req.params)
    .then((videos) => {
      res.status(200).send(videos);
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
      res.status(500).send({ error: 1, errorObject: error });
    });
};

var deleteVideo = (req, res) => {
  Video.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

exports.getListOfAllVideos = getListOfAllVideos;
exports.getListOfVideosBySpecialty = getListOfVideosBySpecialty;
exports.postVideo = postVideo;
exports.deleteVideo = deleteVideo;
