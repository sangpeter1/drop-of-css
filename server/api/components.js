const express = require("express");
const app = express.Router();
const axios = require("axios");
const Component = require("../db/Component");

app.get("/", async (req, res, next) => {
  try {
    res.send(await Component.findAll());
  } catch (err) {
    next(err);
  }
});

module.exports = app;
