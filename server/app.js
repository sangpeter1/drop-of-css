const express = require("express");
const app = express();
const path = require("path");
app.use(express.json({ limit: "50mb" }));

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "../static/index.html"))
  res.render(
      path.join(__dirname, "../static/index.html"), 
      { client_id : process.env.client_id});
  }); //Oauth

app.use("/api/auth", require("./api/auth"));
app.use("/api/cpg", require("./api/cpg"));
app.use("/api/components", require("./api/components"));
app.use("/api/templates", require("./api/templates"));

module.exports = app;
