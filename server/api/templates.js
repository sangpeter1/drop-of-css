const express = require("express");
const app = express.Router();
const axios = require("axios");
const Template = require("../db/Template");
const User = require("../db/User");

app.get("/:userId", async (req, res, next) => {
  try {
    const templates = await Template.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    // console.log("templates in the api/templates", templates);
    res.send(templates);
  } catch (err) {
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const template = await Template.create({
      userId: req.body.userId,
      htmlText: req.body.htmlText,
      type: req.body.type,
    });
    res.status(200).send(template.dataValues);
  } catch (err) {
    next(err);
  }
});

app.put("/:templateId", async (req, res, next) => {
  try {
    const template = await Template.findByPk(req.params.templateId);
    await template.update({
      htmlText: req.body.htmlText,
      name: req.body.name,
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.delete("/:templateId", async (req, res, next) => {
  try {
    const template = await Template.findByPk(req.params.templateId);
    await template.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
