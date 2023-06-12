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
  const { primaryColor, secondaryColor, tertiaryColor, bgColor, component } = req.body;
  const id = component.id;
  try {
    const response = await Component.findByPk(component.id);
    const replacedHtmlText = response.htmlText
      .replaceAll("primaryColor", primaryColor)
      .replaceAll("bgColor", bgColor)
      .replaceAll("secondaryColor", secondaryColor)
      .replaceAll("tertiaryColor", tertiaryColor);
    response.htmlText = replacedHtmlText;
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
