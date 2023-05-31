const express = require("express");
const app = express.Router();
const axios = require("axios");
const Component = require("../db/Component");
//const { Component } = require("../db");

app.get("/", async (req, res, next) => {
  try {
    const comp = await Component.findAll();
    res.send(comp);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
