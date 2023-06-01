const express = require("express");
const app = express.Router();
const axios = require("axios");
const Component = require("../db/Component");

app.get("/", async (req, res, next) => {
  try {
    const comp = await Component.findAll();
    res.send(comp);
  } catch (err) {
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  const { primaryColor, secondaryColor, tertiaryColor, bgColor, component } =
    req.body;
  // console.log("req body", req.body);
  // console.log("colors", primaryColor, secondaryColor, tertiaryColor, bgColor);
  // console.log("component", component);
  const id = component.id;
  // console.log("id", id);
  try {
    const response = await Component.findByPk(component.id);
    // console.log("response", response);
    const replacedHtmlText = response.htmlText
      .replaceAll("primaryColor", primaryColor)
      .replaceAll("bgColor", bgColor)
      .replaceAll("secondaryColor", secondaryColor)
      .replaceAll("tertiaryColor", tertiaryColor);
    console.log("replaced html text", replacedHtmlText);
    response.htmlText = replacedHtmlText;
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
