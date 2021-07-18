const passport = require("passport");

const sendErrorDev = (err, res) => {
  res.status(err.status || err.isJoi ? 422 : 500);
  res.send({
    success: false,
    payload: {
      status: err.isJoi ? 422 : err.status,
      message: err.message,
      stack: err.stack,
    },
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.status || err.isJoi ? 422 : 500);
  res.send({
    success: false,
    payload: {
      status: err.isJoi ? 422 : err.status,
      message: err.message,
    },
  });
};

const errorHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Handle Mongoose Expections and Rejections
const initUnhandledExceptions = () => {
  process.on("unhandledRejection", (err) => {
    console.log(err.name, err);
    console.log("UNHANDLED REJECTION! Shutting down...");
    process.exit(1);
  });

  process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION!  Shutting down...");
    process.exit(1);
  });
};

// Handle unauthorization error
function ensureAuthenticated(callback) {
  function hack(req, res, next) {
    passport.authenticate("jwt", function (err, user, info) {
      if (err) return next(err);
      if (!user)
        return res.status(401).send({
          success: false,
          payload: {
            status: 401,
            message: "Unauthorized",
          },
        });

      req.user = user;
      return callback(req, res, next);
    })(req, res, next);
  }

  return hack;
}

module.exports = {
  errorHandler,
  asyncHandler,
  ensureAuthenticated,
  initUnhandledExceptions,
};
