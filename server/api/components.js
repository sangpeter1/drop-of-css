const express = require("express");
const app = express.Router();
const axios = require("axios");
const Component = require("../db/Component");

app.get("/", async (req, res, next) => {
  try {
    console.log("helloooooooo");
    const comp = await Component.findAll();
    console.log(comp);
    res.send(comp);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
