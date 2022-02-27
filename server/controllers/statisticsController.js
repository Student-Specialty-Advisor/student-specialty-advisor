const Statistics = require("../db/Statistics");
const resultSE = { result: "SE" };
const resultCSE = { result: "CSE" };
const resultRE = { result: "RE" };

var GetStats = (req, res) => {
  const countDocs = async () => {
    var countSE = await Statistics.countDocuments(resultSE);
    var countCSE = await Statistics.countDocuments(resultCSE);
    var countRE = await Statistics.countDocuments(resultRE);
    var total = countSE + countCSE + countRE;
    return {
      countSE: countSE,
      countCSE: countCSE,
      countRE: countRE,
      total: total,
    };
  };

  countDocs()
    .then((numbers) => {
      var percentageSE = (numbers.countSE / numbers.total) * 100;
      var percentageCSE = (numbers.countCSE / numbers.total) * 100;
      var percentageRE = (numbers.countRE / numbers.total) * 100;
      res.status(200).send({
        percentageSE: percentageSE.toFixed(2),
        percentageCSE: percentageCSE.toFixed(2),
        percentageRE: percentageRE.toFixed(2),
      });
    })
    .catch((error) => res.status(500).send(error));
};

exports.GetStats = GetStats;
