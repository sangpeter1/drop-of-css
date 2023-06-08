const express = require("express");
const app = express.Router();
const axios = require("axios");
const Template = require("../db/Template");
const User = require("../db/User");


app.get("/", async (req, res, next) => {
  try {
    const templates = await Template.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.send(templates);
  } catch (err) {
    next(err);
  }
});

app.post("/",  async (req, res, next) => {
  try {
    const response = await Template.create({
      userId: req.body.userId,
      htmlText: req.body.htmlText
    });

    res.status(200).send(response.data);
  } catch (err) {
    next(err);
  }
});

app.put("/:templateId", async (req, res, next) => {
  try {
    const template = await Template.findByPk(req.params.id);

    const response = await template.update( {
      htmlText: req.body
    },);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.delete("/:templateId", async (req, res, next) => {
  try {
    const template = await Template.findByPk(req.params.id);

    template.destroy();
    res.sendStatus(200);

  } catch (err) {
    next(err);
  }
});


module.exports = app;
