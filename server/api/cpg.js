const express = require("express");
const app = express.Router();
const axios = require("axios");

// prefix for this page is /colorgenerator
app.post("/", async (req, res, next) => {
  const { hex, mode, count } = req.body;
  const url = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});
app.put("/", async (req, res, next) => {
  const { hex, mode, count } = req.body;
  const url = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`;
  try {
    const newColor = await axios.get(url);
    console.log("new color", newColor.data);
    res.send(newColor.data);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
