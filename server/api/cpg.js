const express = require("express");
const app = express.Router();
const axios = require("axios");

// prefix for this page is /colorgenerator
app.post("/", async (req, res, next) => {
  // console.log("in the api", req.body);
  //need this when done testing
  const { hex, mode, count } = req.body;

  // for testing
  // let hex = "1e90ff";
  // let format = "json";
  // let mode = "monochrome-light";
  // let count = "5";
  //done testing. comment out when done

  console.log(hex, mode, count);
  const url = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`;
  try {
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
