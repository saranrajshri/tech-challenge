const createError = require("http-errors");
const bycrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config/config.json")[
  process.env.NODE_ENV || "development"
];

// Models
const User = require("../../models/User");

// Middlewares
const { asyncHandler } = require("../../middlewares/errorHandlers");

// Helpers
const { sendSuccessResponse } = require("../../helpers/helpers");

const { createUserValidator } = require("../../validators/userValidators");

let users = (module.exports = {});

/**
 * Create a new User.
 *
 * @name create a new user
 * @route {POST} /user/create
 */

users.create = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const isUserExists = await User.find({ email: email });

  if (isUserExists.length > 0) {
    throw createError.Conflict("This email is already in use");
  }

  // Validate the data
  const validateData = await createUserValidator.validateAsync(req.body);

  // Hash Password
  bycrypt.genSalt(10, (err, salt) => {
    bycrypt.hash(password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      req.body.password = hashedPassword;
      // Save the user
      const user = new User(req.body);
      const savedUser = await user.save();

      savedUser.password = undefined; //remove field

      // Login into the account
      passport.authenticate("login", async (err, user, info) => {
        try {
          req.login(user, { session: false }, async (err) => {
            if (err) next(err);

            const body = { _id: user._id, email: user.email };

            const token = jwt.sign({ user: body }, config.secret);

            let options = {
              maxAge: 1000 * 60 * 15, // would expire after 15 minutes
              httpOnly: false, // The cookie only accessible by the web server
              signed: true, // Indicates if the cookie should be signed
            };

            res.cookie("token", token, options);

            // Send Notification
            // if (
            //   req.body.fcmToken !== null &&
            //   req.body.fcmToken !== undefined &&
            //   req.body.fcmToken.trim() !== ""
            // ) {
            //   const sendNotification = triggerNotification({
            //     registration_ids: [req.body.fcmToken],
            //     notification: {
            //       body: "Login into your account to get started",
            //       title: "Account Created Successfully",
            //     },
            //   });
            // }
            return res.send({
              success: true,
              payload: {
                message: "Account created successfully...",
                token: token,
                user: savedUser,
              },
            });
          });
        } catch (err) {
          next(err);
        }
      })(req, res, next);
    });
  });
});

/**
 * Login User
 *
 * @name login user
 * @route {POST} /user/login
 */

users.login = asyncHandler(async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const err = createError(401, "Incorrect Credentials");
        return next(err);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) next(err);

        const body = { _id: user._id, email: user.email };

        const token = jwt.sign({ user: body }, config.secret);

        // Get the user data
        const userData = await User.findOne({ _id: user._id }, { password: 0 });

        let options = {
          maxAge: 1000 * 60 * 43200, // would expire after 30 days
          httpOnly: false, // The cookie only accessible by the web server
          signed: true, // Indicates if the cookie should be signed
        };

        res.cookie("token", token, options);

        return res.json({
          success: true,
          payload: { token, user: userData },
        });
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

// User Logout
users.logout = asyncHandler(async (req, res, next) => {
  req.logout();
  res.send(sendSuccessResponse({ message: "Logged out successfully" }));
});

/**
 * Check if user is authenticated or not.
 *
 * @name isAuthenticated
 * @route {GET} /user/auth
 */

users.auth = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const userData = await User.findOne({ _id: userId }, { password: 0 });

  if (userData !== null && userData !== undefined) {
    res.send(sendSuccessResponse({ message: "Logged in!", user: userData }));
  } else {
    throw createError.Unauthorized("Unauthorized");
  }
});
