const config = require("../config/config.json")[
  process.env.NODE_ENV || "development"
];

/*
 * Sends JSON format for successful response
 * @params {Object} dataToBeSent
 * @returns {Object}
 */

const sendSuccessResponse = (dataToBeSent) => {
  return {
    success: true,
    payload: dataToBeSent,
  };
};

module.exports = {
  sendSuccessResponse,
};
