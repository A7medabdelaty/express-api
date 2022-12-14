const moment = require("moment");

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get(`host`)}${req.originalUrl}: ${moment().format(
      "MMMM Do YYYY, h:mm:ss a"
    )}`
  );
  next();
};

module.exports = logger;
