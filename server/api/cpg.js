const express = require("express");
const app = express.Router();
const axios = require("axios");

// prefix for this page is /colorgenerator
app.post("/", async (req, res, next) => {
  let { hex, mode, count } = req.body;
  if (!count) {
    count = 4;
  }
  const url = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});
app.put("/", async (req, res, next) => {
  let { hex, mode, count } = req.body;
  console.log("req body", hex, mode, count);
  let url;
  if (count === 1) {
    function getRandomHex() {
      const letters = "0123456789ABCDEF".split("");
      let color = "";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    hex = getRandomHex();
    url = `https://www.thecolorapi.com/id?hex=${hex}&format=json`;
  } else {
    url = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`;
  }
  console.log(url);
  try {
    let newColor = await axios.get(url);
    console.log("new color", newColor.data);
    res.send(newColor.data);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
