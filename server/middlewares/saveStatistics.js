const Statistics = require("../db/Statistics");

var saveStats = (json) => {
  if (json.result) {
    const newStat = new Statistics(json);
    newStat.save().catch((error) => {
      throw error;
    });
  } else {
    throw { error: "missing result" };
  }
};
exports.saveStats = saveStats;
