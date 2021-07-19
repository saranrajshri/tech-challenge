const express = require("express");
const router = express.Router();
const path = require("path");
const { ensureAuthenticated } = require("../middlewares/errorHandlers");
const user = require("./user/user");
const graph = require("./graph/graph");

router
  .post("/user/create", user.create)
  .post("/user/login", user.login)
  .get("/user/auth", ensureAuthenticated(user.auth));

router
  .get("/graph/line", graph.lineGraph)
  .get("/graph/pie", graph.pieChart)
  .get("/graph/bar", graph.barChart);

module.exports = router;
