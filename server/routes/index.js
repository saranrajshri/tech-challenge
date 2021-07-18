const express = require("express");
const router = express.Router();
const path = require("path");
const { ensureAuthenticated } = require("../middlewares/errorHandlers");
const user = require("./user/user");

router
  .post("/user/create", user.create)
  .post("/user/login", user.login)
  .get("/user/auth", ensureAuthenticated(user.auth));

module.exports = router;
