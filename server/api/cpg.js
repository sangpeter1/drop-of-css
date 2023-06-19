const express = require("express");
const app = express.Router();
const axios = require("axios");
const colorapiresponse = require("../db/colorapi-response-object");

// prefix for this page is /colorgenerator
app.post("/", async (req, res, next) => {
  let { hex, mode } = req.body;
  if (!mode) {
    mode === "monochrome";
  }
  // console.log("req body post", hex, mode);
  try {
    let output = [];
    if (mode === "primary accent" || mode === "complementary accent" || mode === "pastel") {
      if (mode === "primary accent") {
        const primaryAccentURL = `https://www.thecolorapi.com/id?hex=${hex}&format=json`;
        const responseOne = await axios.get(primaryAccentURL);
        const colorOne = responseOne.data;
        const newSat = Math.max(Math.min(colorOne.hsl.s / 2.5, 40), 20);
        const newLightness = Math.min(colorOne.hsl.l * 4, 90);
        const urlRest = `https://www.thecolorapi.com/scheme?hsl=${colorOne.hsl.h},${newSat}%,${newLightness}%&format=json&mode=monochrome-light&count=3`;
        const responseRest = await axios.get(urlRest);
        // console.log(responseRest.data.colors, "restponse rest!!!");
        output.push(colorOne);
        output.push(...responseRest.data.colors);
      } else if (mode === "complementary accent") {
        const complementaryAccentURL = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=complement&count=2`;
        const responseMains = await axios.get(complementaryAccentURL);
        const primaryComplements = responseMains.data.colors;
        // console.log(primaryComplements);
        const newSat = Math.max(Math.min(primaryComplements[0].hsl.s / 2, 40), 20);
        const urlThree = `https://www.thecolorapi.com/id?hsl=${primaryComplements[0].hsl.h},${newSat}%,80%&format=json`;
        // console.log(urlThree, "urlThree");
        const urlFour = `https://www.thecolorapi.com/id?hsl=${primaryComplements[1].hsl.h},${newSat}%,80%&format=json`;
        const responseThree = await axios.get(urlThree);
        const colorThree = responseThree.data;
        const responseFour = await axios.get(urlFour);
        const colorFour = responseFour.data;
        output.push(...primaryComplements);
        output.push(colorThree);
        output.push(colorFour);
      } else if (mode === "pastel") {
        const pastelURL = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=quad&count=4`;
        const responsePastel = await axios.get(pastelURL);
        const colors = responsePastel.data.colors;
        // console.log("pastel");
        for (let color of colors) {
          const hue = color.hsl.h;
          const lightness = Math.min(color.hsl.l * 3, 75);
          const sat = 35;
          const urlPastel = `https://www.thecolorapi.com/id?hsl=${hue},${sat}%,${lightness}%&format=json`;
          const response = await axios.get(urlPastel);
          // console.log("loop response", response.data);
          output.push(response.data);
        }
      }
    } else {
      const url = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=4`;
      const response = await axios.get(url);
      const originalColors = response.data.colors;
      output.push(...originalColors);
    }
    // console.log("this is the output you're trying to send", output);
    res.send(output);
  } catch (err) {
    res.send(colorapiresponse);
    next(err);
  }
});

// needs functions for new styles
app.put("/", async (req, res, next) => {
  let { hex, mode, count } = req.body;
  // console.log("req body put", hex, mode, count);
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
  } else if (
    (count > 1 && mode === "primary accent") ||
    mode === "complementary accent" ||
    mode === "pastel"
  ) {
    mode = "monochrome";
    url = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`;
  } else {
    url = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`;
  }

  // console.log(url);
  try {
    let newColor = await axios.get(url);
    // console.log("new color", newColor.data);
    res.send(newColor.data);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
